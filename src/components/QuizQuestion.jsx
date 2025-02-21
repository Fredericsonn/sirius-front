import { Button } from "@/components/ui/button";

export default function QuizQuestion({ question, answer, setAnswer, loading }) {
  return (



    <div>
      <div className="text-lg font-medium mt-4">{question}</div>
      {loading ? (
        <div className="text-blue-500 text-lg font-medium animate-pulse">
          Processing...
        </div> ) : (


        <div className="flex items-center space-x-4">
          <Button onClick={() => setAnswer(answer - 1)}>⬇</Button>
          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(Number(e.target.value))}
            className="text-center border p-2 w-20"
          />
          <Button onClick={() => setAnswer(answer + 1)}>⬆</Button>
        </div>)}
    </div>);}
