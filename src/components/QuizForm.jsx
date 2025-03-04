import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const QuizForm = ({ consumptionItems, onSubmit }) => {
  const [constraints, setConstraints] = useState({});

  const handleChange = (e, id) => {
    setConstraints({ ...constraints, [id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(constraints);
  };

  return (
    <Card className="w-full max-w-lg mx-auto bg-gray-900 text-white p-6 rounded-xl shadow-lg">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4">Set Your Constraints</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {consumptionItems.map((item) => (
            <div key={item.id} className="flex flex-col">
              <label className="text-lg">
                C'est quoi la fréquence d'utilisation minimale pour votre{" "}
                {item.name} ?
              </label>
              <input
                type="number"
                placeholder="Minimum Usage Frequency"
                className="input input-bordered w-full mt-2 bg-gray-800 border-gray-600"
                onChange={(e) => handleChange(e, item.id)}
              />
            </div>
          ))}
        </form>
      </CardContent>
    </Card>
  );
};

export default QuizForm;
