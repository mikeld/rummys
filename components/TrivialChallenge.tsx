import React, { useState, useEffect } from 'react';
import { TrivialQuestion } from '../types';
import { generateTrivialQuestions } from '../services/geminiService';
import TrivialQuestionItem from './TrivialQuestionItem';
import LoadingSpinner from './LoadingSpinner';
import ErrorDisplay from './ErrorDisplay';

interface TrivialChallengeProps {
    onBack: () => void;
}

const TrivialChallenge: React.FC<TrivialChallengeProps> = ({ onBack }) => {
    const [questions, setQuestions] = useState<TrivialQuestion[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setLoading(true);
                setError(null);
                const generatedQuestions = await generateTrivialQuestions();
                setQuestions(generatedQuestions);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Ocurrió un error desconocido.");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, []);

    const renderContent = () => {
        if (loading) {
            return <LoadingSpinner text="La IA está generando preguntas únicas para ti..." />;
        }
        if (error) {
            return <ErrorDisplay message={error} onRetry={() => window.location.reload()} />;
        }
        return (
             <div className="space-y-4">
                {questions.map((item, index) => <TrivialQuestionItem key={index} {...item} />)}
            </div>
        );
    }

    return (
         <div className="text-pamplona-light w-full max-w-3xl mx-auto p-4 animate-fade-in">
             <button onClick={onBack} className="mb-8 bg-pamplona-gray hover:bg-pamplona-red text-white font-bold py-2 px-4 rounded-full inline-flex items-center transition-colors duration-300 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Volver a la selección</span>
            </button>
            <div className="text-center mb-10 border-b-2 border-pamplona-red/50 pb-4">
                 <h2 className="text-4xl lg:text-5xl font-extrabold text-white">El Reto del Trivial</h2>
                 <p className="text-gray-300 mt-2">La IA de Gemini ha preparado estas preguntas. ¡Demuestra lo que sabes!</p>
            </div>
            {renderContent()}
        </div>
    );
};

export default TrivialChallenge;