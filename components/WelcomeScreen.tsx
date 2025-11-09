import React from 'react';
import { LocationCollection } from '../types';

interface LocationSelectionScreenProps {
  data: LocationCollection;
  onSelectLocation: (location: string) => void;
}

const LocationCard: React.FC<{ location: string; imageUrl: string; onSelect: () => void; delay: number; }> = ({ location, imageUrl, onSelect, delay }) => {
    return (
        <button 
            onClick={onSelect}
            className="group relative rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pamplona-red focus:ring-opacity-70 animate-card-enter"
            style={{ animationDelay: `${delay}ms` }}
        >
            <img src={imageUrl} alt={location} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-xl font-bold text-white drop-shadow-md">{location}</h3>
            </div>
        </button>
    );
};


const LocationSelectionScreen: React.FC<LocationSelectionScreenProps> = ({ data, onSelectLocation }) => {
  const locations = Object.keys(data);
  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 text-center">
        <div className="animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                ¡Hola, Rummys!
            </h2>
            <p className="text-gray-300 mb-12 text-lg max-w-2xl mx-auto">
            Bienvenidos a Pamplona. Como auténticos maestros del Rummy, habéis demostrado una inteligencia, estrategia y saber estar fuera de lo común.
            ¿Seréis capaces de aplicar esas mismas habilidades para superar la Ginkana de Pamplona?
            Selecciona un lugar para descubrir su historia, sus secretos y aceptar el reto de nuestra ginkana.
            </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {locations.map((locationName, index) => (
                <LocationCard 
                    key={locationName} 
                    location={locationName} 
                    imageUrl={data[locationName].imageUrl}
                    onSelect={() => onSelectLocation(locationName)} 
                    delay={index * 100}
                />
            ))}
        </div>
    </div>
  );
};

export default LocationSelectionScreen;