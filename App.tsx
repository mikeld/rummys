
import React, { useState } from 'react';
import { LocationCollection } from './types';
import Header from './components/Header';
import LocationSelectionScreen from './components/WelcomeScreen';
import LocationDetailScreen from './components/TourStep';
import TrivialChallenge from './components/TrivialChallenge';
import { locationsData } from './data/locations';

const typedLocationsData: LocationCollection = locationsData;

const App: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const handleSelectLocation = (location: string) => {
    setSelectedLocation(location);
  };

  const handleBack = () => {
    setSelectedLocation(null);
  };

  const renderContent = () => {
    if (selectedLocation) {
        if (selectedLocation === "El Reto del Trivial") {
            return <TrivialChallenge onBack={handleBack} />;
        }
        if (typedLocationsData[selectedLocation]) {
            return (
                <LocationDetailScreen
                locationName={selectedLocation}
                data={typedLocationsData[selectedLocation]}
                onBack={handleBack}
                />
            );
        }
    }

    return (
      <LocationSelectionScreen
        data={typedLocationsData}
        onSelectLocation={handleSelectLocation}
      />
    );
  };

  return (
    <div className="min-h-screen bg-pamplona-dark flex flex-col font-sans">
      <Header />
      <main className="flex-grow flex flex-col justify-center items-center py-8 px-4">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;