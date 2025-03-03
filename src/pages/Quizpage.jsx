import React from "react";
import QuizForm from "../components/QuizForm";



const QuizPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <div className="max-w-2xl w-full bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-green-400 mb-4">
          define Your Usage Constraints
        </h1>
        <p className="text-gray-300 text-center mb-6">
          S
          set the minimum usage frequency for each machine to optimize your carbon footprint.
        </p>
        <QuizForm />
      </div>
    </div>
  );
};

export default QuizPage;
