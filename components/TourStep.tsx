import React, { useState } from 'react';
import { LocationData } from '../types';

interface LocationDetailScreenProps {
    locationName: string;
    data: LocationData;
    onBack: () => void;
}

const DetailCard: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactElement; }> = ({ title, children, icon }) => (
    <div className="bg-pamplona-gray/50 rounded-lg p-6 mb-6 shadow-lg border border-pamplona-gray">
        <div className="flex items-center mb-4">
            <div className="w-8 h-8 mr-4 text-pamplona-red">{icon}</div>
            <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
        <div className="text-gray-300 text-base leading-relaxed space-y-3">
            {children}
        </div>
    </div>
);

const GinkanaChecklistItem: React.FC<{ text: string }> = ({ text }) => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <div 
            className={`flex items-start p-4 rounded-lg transition-all duration-300 cursor-pointer ${isChecked ? 'bg-green-500/20' : 'bg-pamplona-dark/50 hover:bg-pamplona-dark'}`}
            onClick={() => setIsChecked(!isChecked)}
        >
            <div className="flex items-center justify-center w-6 h-6 mr-4 mt-1 border-2 border-gray-500 rounded-md flex-shrink-0 transition-colors duration-300">
                {isChecked && <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
            </div>
            <span className={`flex-grow transition-colors duration-300 ${isChecked ? 'line-through text-gray-500' : 'text-gray-200'}`}>{text}</span>
        </div>
    )
}

const LocationDetailScreen: React.FC<LocationDetailScreenProps> = ({ locationName, data, onBack }) => {
    
    const icons = {
        history: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>,
        fact: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311a15.045 15.045 0 01-7.5 0C4.508 19.64 2.25 15.184 2.25 10.5 2.25 5.816 4.508 1.36 8.25 1.36c3.742 0 6 4.444 6 9.14" /></svg>,
        challenge: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    };

    return (
        <div className="text-pamplona-light w-full max-w-3xl mx-auto p-4 animate-fade-in">
             <button onClick={onBack} className="mb-8 bg-pamplona-gray hover:bg-pamplona-red text-white font-bold py-2 px-4 rounded-full inline-flex items-center transition-colors duration-300 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Volver a la selección</span>
            </button>
            
            <div className="my-6 rounded-lg overflow-hidden shadow-2xl border-2 border-pamplona-gray/50">
                <img src={data.imageUrl} alt={`Imagen de ${locationName}`} className="w-full h-64 object-cover" />
            </div>

            <div className="text-center mb-10 border-b-2 border-pamplona-red/50 pb-4">
                 <h2 className="text-4xl lg:text-5xl font-extrabold text-white">{locationName}</h2>
            </div>
            
            <DetailCard title="Historia" icon={icons.history}>
                <p>{data.historia}</p>
            </DetailCard>

            <DetailCard title="Curiosidades" icon={icons.fact}>
                <ul className="list-disc list-inside space-y-2">
                    {data.curiosidades.map((fact, index) => <li key={index}>{fact}</li>)}
                </ul>
            </DetailCard>

            <DetailCard title="Ginkana: ¡Encuéntralos!" icon={icons.challenge}>
                <div className="space-y-4">
                    {data.ginkana.map((item, index) => <GinkanaChecklistItem key={index} text={item} />)}
                </div>
            </DetailCard>
        </div>
    );
};

export default LocationDetailScreen;