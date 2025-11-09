import React from 'react';

interface ErrorDisplayProps {
    message: string;
    onRetry?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
    return (
        <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg relative text-center" role="alert">
            <strong className="font-bold block mb-2">¡Vaya! Algo ha fallado</strong>
            <span className="block sm:inline">{message}</span>
            {onRetry && (
                <div className="mt-4">
                    <button 
                        onClick={onRetry} 
                        className="bg-pamplona-red hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
                    >
                        Reintentar
                    </button>
                </div>
            )}
        </div>
    );
};

export default ErrorDisplay;