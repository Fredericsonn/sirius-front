import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";







const QuizForm = ({ onSubmit }) => {
  const [constraints, setConstraints] = useState({});

  const handleChange = (e, id) => {
    setConstraints({ ...constraints, [id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(constraints);};







  return (
    <Card className="w-full max-w-lg mx-auto bg-gray-900 text-white p-6 rounded-xl shadow-lg">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4">Set Your Constraints</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["Machine 1", "Machine 2", "Machine 3"].map((machine, index) => (
            <div key={index} className="flex flex-col">
              <label className="text-lg">{machine}</label>
              <input
                type="number"
                placeholder="Minimum Usage Frequency"
                className="input input-bordered w-full mt-2 bg-gray-800 border-gray-600"
                onChange={(e) => handleChange(e, machine)}
              />
            </div>
          ))}
          <Button className="btn btn-primary w-full mt-4" type="submit">Submit</Button>
        </form>
      </CardContent>
    </Card>



  );};

export default QuizForm;