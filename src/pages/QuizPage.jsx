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
  const [optimizationResult, setOptimizationResult] = useState(null);

  useEffect(() => {
    const fetchConsumptionData = async () => {
      setLoading(true);
      try {
        const [itemsResponse, consumptionResponse] = await Promise.all([
          spring.get(`/consumptions/${consumptionId}/items`),
          spring.get(`/consumptions/${consumptionId}`),
        ]);

        const items = itemsResponse.data;
        setConsumptionItems(items);
        
        const initialAnswers = {};
        items.forEach(item => {
          initialAnswers[item.id] = item.usageFrequency;
        });
        setAnswers(initialAnswers);
        
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
    try {
      // Save constraints
      const constraints = {};
      consumptionItems.forEach(item => {
        constraints[item.id] = parseFloat(answers[item.id]) || 0;
      });
      
      await spring.post(`/api/minimal/constraints/${consumptionId}`, constraints);
      
      // Get optimization results
      const optimizeResponse = await spring.post(`/api/minimal/optimize/${consumptionId}`);
      setOptimizationResult(optimizeResponse.data);
      setIsOptimized(true);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Erreur lors de la soumission des réponses');
      console.error('Detailed error:', err);
    }
  };

  if (loading) return <div className='flex justify-center items-center h-screen'>Chargement...</div>;
  if (error) return <div className='flex justify-center items-center h-screen text-error'>Erreur : {error}</div>;
  if (!quizStarted) return (
    <div className='hero min-h-screen bg-base-200'>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <h1 className='text-5xl font-bold'>Optimisons votre consommation {name} !</h1>
          <p className='py-6'>
            Nous allons vous poser quelques questions rapides pour vous aider à réduire votre empreinte carbone.
          </p>
          <button onClick={handleStartQuiz} className='btn btn-primary'>C'est parti !</button>
        </div>
      </div>
    </div>
  );

  if (isOptimized && optimizationResult) {
    return (
      <OptimizationReport
        optimizedCarbonFootprint={optimizationResult.optimizedCarbonFootprint}
        consumptionItems={consumptionItems}
        optimizedFrequencies={optimizationResult.optimizedFrequencies}
        initialAnswers={answers}
        savedCarbon={optimizationResult.savedCarbon}
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
        onPrevious={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
        onNext={() => setCurrentQuestionIndex(prev => Math.min(consumptionItems.length - 1, prev + 1))}
        isFirstQuestion={currentQuestionIndex === 0}
        isLastQuestion={currentQuestionIndex === consumptionItems.length - 1}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default QuizPage;