import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QuizQuestion from '../components/QuizQuestion';
import QuizNavigation from '../components/QuizNavigation';
import OptimizationReport from '../components/OptimizationReport';
import { spring } from '../util';

const QuizPage = () => {
  const { consumptionId } = useParams();
  const [consumptionItems, setConsumptionItems] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [name, setName] = useState('');
  const [isOptimized, setIsOptimized] = useState(false);
  const [optimizedCarbonFootprint, setOptimizedCarbonFootprint] = useState(0);
  const [optimizedFrequencies, setOptimizedFrequencies] = useState({});
  const [savedCarbon, setSavedCarbon] = useState(0);

  useEffect(() => {
    const fetchConsumptionData = async () => {
      setLoading(true);
      try {
        const [itemsResponse, consumptionResponse] = await Promise.all([
          spring.get(`/consumptions/${consumptionId}/items`),
          spring.get(`/consumptions/${consumptionId}`),
        ]);

        setConsumptionItems(itemsResponse.data);
        setAnswers(prevAnswers => {
          const initialAnswers = { ...prevAnswers }; 
          itemsResponse.data.forEach(item => {
              initialAnswers[item.id] = item.usageFrequency;
          });
          return initialAnswers;
        });
        setName(consumptionResponse.data.name);
      } catch (err) {
        setError(err.message || 'Erreur lors de la récupération des données');
      } finally {
        setLoading(false);
      }
    };

    fetchConsumptionData();
  }, [consumptionId]);

  const handleFrequencyChange = (itemId, newFrequency) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [itemId]: newFrequency,
    }));
  };

  const handleStartQuiz = () => setQuizStarted(true);

  const handleSubmit = async () => {
    if (!consumptionItems.every(item => answers[item.id] !== undefined && !isNaN(answers[item.id]))) {
      alert('Veuillez répondre à toutes les questions.');
      return;
    }

    const constraints = Object.fromEntries(
      consumptionItems.map(item => [item.id, parseFloat(answers[item.id])])
    );

    try {
      const [constraintsResponse, optimizeResponse] = await Promise.all([
        spring.post(`/api/minimal/constraints/${consumptionId}`, constraints),
        spring.post(`/api/minimal/optimize/${consumptionId}`),
      ]);

      console.log('Réponse du serveur (constraints):', constraintsResponse.data);
      console.log('Réponse du serveur (optimize):', optimizeResponse.data);

      setOptimizedCarbonFootprint(optimizeResponse.data.optimizedCarbonFootprint);
      setSavedCarbon(optimizeResponse.data.savedCarbon);
      setOptimizedFrequencies(optimizeResponse.data.optimizedFrequencies);
      setIsOptimized(true);
    } catch (err) {
      setError(err.response?.data || err.message || 'Erreur lors de la soumission des réponses');
      console.error('Detailed error:', err.response);
    }
  };

  const handlePrevious = () => setCurrentQuestionIndex(prevIndex => Math.max(0, prevIndex - 1));
  const handleNext = () => setCurrentQuestionIndex(prevIndex => Math.min(consumptionItems.length - 1, prevIndex + 1));

  if (loading) {
    return <div className='flex justify-center items-center h-screen'>Chargement...</div>;
  }

  if (error) {
    return <div className='flex justify-center items-center h-screen text-error'>Erreur : {error}</div>;
  }

  if (!quizStarted) {
    return (
      <div className='hero min-h-screen bg-base-200'>
        <div className='hero-content text-center'>
          <div className='max-w-md'>
            <h1 className='text-5xl font-bold'>Optimisons votre consommation {name} !</h1>
            <p className='py-6'>
              Nous allons vous poser quelques questions rapides pour vous aider à réduire votre empreinte carbone.
              Cela ne prendra que quelques minutes.
            </p>
            <button onClick={handleStartQuiz} className='btn btn-primary'>
              C'est parti !
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isOptimized) {
    return (
      <OptimizationReport
        optimizedCarbonFootprint={optimizedCarbonFootprint}
        consumptionItems={consumptionItems}
        optimizedFrequencies={optimizedFrequencies}
        initialAnswers={answers}
        savedCarbon={savedCarbon}
      />
    );
  }

  const currentItem = consumptionItems[currentQuestionIndex];

  return (
    <div className='container mx-auto p-8'>
      <h1 className='text-3xl font-bold text-center mb-8'>Quiz d'optimisation</h1>
      {currentItem && (
        <QuizQuestion
          itemName={currentItem.name}
          onFrequencyChange={newFrequency => handleFrequencyChange(currentItem.id, newFrequency)}
          currentFrequency={answers[currentItem.id] || ''}
        />
      )}

      <QuizNavigation
        onPrevious={handlePrevious}
        onNext={handleNext}
        isFirstQuestion={currentQuestionIndex === 0}
        isLastQuestion={currentQuestionIndex === consumptionItems.length - 1}
        onSubmit={handleSubmit}
      />
    </div>);};

export default QuizPage;