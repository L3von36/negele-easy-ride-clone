const Header = () => {
  return (
    <header className="bg-gradient-to-b from-primary/90 to-primary/80 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            {/* Bus icon would go here */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110 4h14a2 2 0 110 4M5 8v9a2 2 0 002 2h10a2 2 0 002-2V8m-6-4h4" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Negele Borena</h1>
            <p className="text-sm text-white/90">Transport Authority</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors flex items-center space-x-2 text-sm font-medium text-white">
            Search
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 105.636 3.636m12.728 12.728-1.414-1.414" />
            </svg>
          </button>
          <button className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors flex items-center space-x-2 text-sm font-medium text-white">
            {/* Icon button would go here */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h8m-4 1v10m4-11H4a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2v-4a2 2 0 00-2-2z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;