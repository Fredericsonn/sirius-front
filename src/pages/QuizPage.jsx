import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuizQuestion from '../components/QuizQuestion';
import QuizNavigation from '../components/QuizNavigation';
import { spring } from '../util';

function QuizPage() {
    const { consumptionId } = useParams();
    
    const navigate = useNavigate();
    const [consumptionItems, setConsumptionItems] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quizStarted, setQuizStarted] = useState(false);
    const [name,setName] = useState("");
    const [isOptimized, setIsOptimized] = useState(false);
    const [optimizedValue, setOptimizedValue] = useState(false);


    useEffect(() => {
        
        const fetchConsumptionItems = async () => {
            try {                
                const response = await spring.get(`/consumptions/${consumptionId}/items`);
                setConsumptionItems(response?.data);
                const initialAnswers = {};
                response.data.forEach(item => {
                   initialAnswers[item.id] = item.usageFrequency;
                });
                setAnswers(initialAnswers);

                const res = await spring.get(`/consumptions/${consumptionId}`);
                
                
                setName(res.data.name);

            } catch (err) {
                setError(err.message || 'there is an erreur lors de la récupération des données');
            } finally {
                setLoading(false);
            }
        };

        fetchConsumptionItems();
    }, [consumptionId]);


    const handleFrequencyChange = (itemId, newFrequency) => {
        setAnswers({
            ...answers,
            [itemId]: newFrequency,
        });
    };

    const handleStartQuiz = () => {
        setQuizStarted(true);
    };

    const handleSubmit = async () => {
        const isAllAnswered = consumptionItems.every((item) => answers[item.id] !== undefined && !isNaN(answers[item.id]));
        if (!isAllAnswered) {
            alert('Veuillez répondre à toutes les questions.');
            return;
        }

        const constraints = {};
        consumptionItems.forEach(item => {
          constraints[item.id] = answers[item.id];
        });


        const requestData = {
            consumptionId: parseInt(consumptionId), 
            constraints: constraints
        }
        
        try {

            const response = await spring.post('/api/quiz/constraints', requestData);
            
            console.log('Réponse du serveur:', response.data);
            
            const res = await spring.get('/api/optimize/' + consumptionId);

            setOptimizedValue(res.data.optimizedCarbonFootprint);

            setIsOptimized(true);

        } catch (err) {
            setError(err.response?.data?.message || err.message || 'erreur de la soumission des reponses');
        }
    };

    const handlePrevious = () => {
        setCurrentQuestionIndex((prevIndex) => Math.max(0, prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentQuestionIndex((prevIndex) => Math.min(consumptionItems.length - 1, prevIndex + 1));
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Chargement...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-error">Erreur : {error}</div>;
    }

    if (!quizStarted) {
        return (
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Optimisons votre consommation {name} !</h1>
                        <p className="py-6">
                            Nous allons vous poser quelques questions rapides pour vous aider à réduire votre
                            empreinte carbone. Cela ne prendra que quelques minutes.
                        </p>
                        <button onClick={handleStartQuiz} className="btn btn-primary">
                            C'est parti !
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (isOptimized) {
        return <OptimizationReport optimizedCarbonFootprint={optimizedValue} />
    }
    const currentItem = consumptionItems[currentQuestionIndex];

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Quiz d'optimisation</h1>
            {currentItem && (
                <QuizQuestion
                    itemName={currentItem.name}
                    onFrequencyChange={(newFrequency) => handleFrequencyChange(currentItem.id, newFrequency)}
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
        </div>
    );
}

const OptimizationReport = ({optimizedCarbonFootprint}) => {

    return (
        <main className='flex flex-col w-full justify-center items-center'>
            <h1 className='text-xl font-semibold tracking-wider text-primary'>Your optimized consumption now emmits :</h1>
            <p className='text-xl font-semibold underline italic tracking-wider text-secondary'>{optimizedCarbonFootprint}</p>
        </main>
    )
}
export default QuizPage;