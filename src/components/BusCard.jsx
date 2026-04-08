const BusCard = ({ name, seats, price, time, hasVip }) => {
  return (
    <div className="bg-card rounded-xl shadow-medium p-6 flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/90 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293H6a2 2 0 01-2-2v-5m16 0h2a2 2 0 012 2v5m-2.586-.707l-2.414-2.414a1 1 0 01-.707-.293h-3.172a1 1 0 00-.707-.293l-2.414-2.414a1 1 0 00-.707-.293H6a2 2 0 00-2 2v5m16 0V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-text-primary">{name}</h3>
            {hasVip && (
              <span className="ml-2 px-2 py-0.5 bg-accent/20 text-accent text-xs rounded-full font-medium">
                VIP
              </span>
            )}
          </div>
        </div>
        <div className="text-right">
          <p className="font-semibold text-accent">{price}</p>
          <p className="text-sm text-text-secondary">{seats}</p>
        </div>
      </div>
      
      <div className="flex items-center mb-4">
        <p className="flex-1 text-sm text-text-secondary">{time}</p>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-1 h-4 bg-green-500 rounded-full"></div>
          <div className="flex-1 border-t border-gray-200"></div>
          <div className="w-1 h-4 bg-red-500 rounded-full"></div>
        </div>
      </div>
      
      <div className="mt-auto pt-4">
        <button
          className="w-full bg-accent rounded-xl px-4 py-2 text-white font-medium hover:bg-accent/90 transition-colors"
        >
          Select Seat →
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BusCard;