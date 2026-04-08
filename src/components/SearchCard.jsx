import { useState } from 'react';

const SearchCard = () => {
  const [departure, setDeparture] = useState('Negele Borena');
  const [destination, setDestination] = useState('Hawassa');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const cities = [
    'Negele Borena',
    'Addis Ababa',
    'Hawassa',
    'Moyale',
    'Yabello'
  ];

  const handleSwap = () => {
    setDeparture(destination);
    setDestination(departure);
  };

  return (
    <div className="relative z-10 mb-16">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card rounded-2xl shadow-medium">
          <div className="p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
              {/* Departure */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">From</label>
                <select
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                >
                  {cities.map(city => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Swap */}
              <div className="flex items-center justify-center">
                <button
                  onClick={handleSwap}
                  className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-white hover:bg-accent/90 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
              
              {/* Destination */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">To</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                >
                  {cities.map(city => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mt-6 sm:mt-0 sm:col-span-3">
              <label className="block text-sm font-medium text-text-secondary mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
              />
            </div>
            
            <div className="mt-8 sm:mt-0 sm:col-span-3">
              <button
                className="w-full bg-accent rounded-xl px-6 py-3 text-white font-medium text-lg hover:bg-accent/90 transition-colors flex items-center justify-center space-x-2"
              >
                Search Buses
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;