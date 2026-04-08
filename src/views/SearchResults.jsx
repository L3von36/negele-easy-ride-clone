import BusCard from '../components/BusCard';

const SearchResults = () => {
  return (
    <>
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-card rounded-xl shadow-medium p-6 mb-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-text-secondary">From</p>
              <p className="text-lg font-semibold text-text-primary">Negele Borena</p>
            </div>
            <div className="flex items-center justify-center sm:justify-end">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9-7-9-7-9 7 9 7z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-text-secondary">To</p>
              <p className="text-lg font-semibold text-text-primary">Hawassa</p>
            </div>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-3 text-center text-sm text-text-secondary">
            <div>
              <p className="font-medium">Distance</p>
              <p>320 km</p>
            </div>
            <div>
              <p className="font-medium">Duration</p>
              <p>5h 45m</p>
            </div>
            <div>
              <p className="font-medium">Date</p>
              <p>Tuesday, April 7</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-2xl font-bold text-center mb-8">Available Buses</h2>
        <div className="grid gap-6">
          <BusCard 
            name="Ethio Bus"
            seats="44 seats available"
            price="300 ETB"
            time="06:00 → 11:45"
            hasVip={false}
          />
          <BusCard 
            name="Habesha Bus"
            seats="38 seats available"
            price="350 ETB"
            time="14:00 → 19:45"
            hasVip={true}
          />
        </div>
      </div>
    </>
  );
};

export default SearchResults;