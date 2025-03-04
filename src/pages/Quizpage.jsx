import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const QuizPage = () => {
  const { consumptionId } = useParams();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchConsumptionItems = async () => {
      try {
        const response = await fetch(`/api/consumption/${consumptionId}/items`);
        const data = await response.json();
        setQuestions(
          data.map((item) => ({
            id: item.id,
            question: `C'est quoi la fréquence d'utilisation minimale pour votre ${item.name} ?`,
          }))
        );
      } catch (error) {
        console.error("Error fetching consumption items:", error);
      }
    };

    fetchConsumptionItems();
  }, [consumptionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="max-w-2xl w-full bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Quiz de consommation</h1>
        {questions.length > 0 ? (
          <QuizForm questions={questions} consumptionId={consumptionId} />
        ) : (
          <p className="text-center">Chargement des questions...</p>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
