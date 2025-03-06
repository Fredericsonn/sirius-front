import React from 'react';

function QuizNavigation({ onPrevious, onNext, isFirstQuestion, isLastQuestion, onSubmit }) {
    return (
        <div className="flex justify-center mt-8">
            <button
                type="button"
                onClick={onPrevious}
                disabled={isFirstQuestion}
                className="btn btn-outline btn-primary mr-4"
            >
                Précédent
            </button>
            {isLastQuestion ? (
                <button type="button" onClick={onSubmit} className="btn btn-primary">
                    Soumettre
                </button>
            ) : (
                <button type="button" onClick={onNext} className="btn btn-outline btn-primary">
                    Suivant
                </button>
            )}
        </div>
    );
}

export default QuizNavigation;