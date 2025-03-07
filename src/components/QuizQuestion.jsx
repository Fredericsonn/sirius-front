import React from 'react';

function QuizQuestion({ itemName, onFrequencyChange, currentFrequency }) {
    return (
        <div className="mb-6">
            <label htmlFor={`frequency-${itemName}`} className="block text-sm font-bold mb-2">
                Combien de temps es tu obligé d'utiliser {itemName} ?
            </label>
            <input
                type="number"
                id={`frequency-${itemName}`}
                min="0"
                step="0.1"
                value={currentFrequency}
                onChange={(e) => {
                    const newValue = parseFloat(e.target.value);
                    if (!isNaN(newValue)) {
                        onFrequencyChange(newValue);
                    } else {
                        onFrequencyChange(0); 
                    }
                }}
                className="input input-bordered w-full"
                required
            />
        </div>
    );
}

export default QuizQuestion;