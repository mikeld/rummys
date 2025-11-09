import React, { useState } from 'react';
import { TrivialQuestion } from '../types';

const TrivialQuestionItem: React.FC<TrivialQuestion> = ({ pregunta, opciones, respuestaCorrecta, explicacion }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const isAnswered = selectedAnswer !== null;

    const handleAnswer = (opcion: string) => {
        if (!isAnswered) {
            setSelectedAnswer(opcion);
        }
    };

    const getButtonClass = (opcion: string) => {
        if (!isAnswered) {
            return 'bg-pamplona-dark/50 hover:bg-pamplona-dark';
        }
        if (opcion === respuestaCorrecta) {
            return 'bg-green-600/80';
        }
        if (opcion === selectedAnswer) {
            return 'bg-red-600/80';
        }
        return 'bg-pamplona-dark/50 opacity-60';
    };

    return (
        <div className="bg-pamplona-gray/50 p-4 rounded-lg shadow-lg border border-pamplona-gray animate-fade-in">
            <h4 className="font-semibold text-white mb-3 text-lg">{pregunta}</h4>
            <div className="grid grid-cols-1 gap-2">
                {opciones.map(opcion => (
                    <button
                        key={opcion}
                        onClick={() => handleAnswer(opcion)}
                        disabled={isAnswered}
                        className={`w-full text-left p-3 rounded-md transition-all duration-300 text-white ${getButtonClass(opcion)} ${!isAnswered ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                    >
                        {opcion}
                    </button>
                ))}
            </div>
            {isAnswered && (
                 <p className="mt-3 text-sm p-3 bg-black/30 rounded-md text-gray-300 animate-fade-in">{explicacion}</p>
            )}
        </div>
    );
};

export default TrivialQuestionItem;
