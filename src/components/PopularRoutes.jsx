const PopularRoutes = () => {
  const routes = [
    {
      from: 'Negele Borena',
      to: 'Addis Ababa',
      distance: '470 km',
      duration: '8h 30m'
    },
    {
      from: 'Negele Borena',
      to: 'Hawassa',
      distance: '320 km',
      duration: '5h 45m'
    },
    {
      from: 'Negele Borena',
      to: 'Moyale',
      distance: '280 km',
      duration: '5h'
    },
    {
      from: 'Negele Borena',
      to: 'Yabello',
      distance: '180 km',
      duration: '3h 15m'
    }
  ];

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center mb-8">Popular Routes</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {routes.map((route, index) => (
            <div key={index} className="bg-card rounded-xl shadow-soft p-6 flex flex-col h-full">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-8 h-8 bg-primary/90 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9-7-9-7-9 7 9 7z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-text-primary">{route.from}</p>
                  <p className="text-sm text-text-secondary">{route.to}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-text-secondary">
                <span>{route.distance}</span>
                <span>{route.duration}</span>
              </div>
              <div className="mt-auto pt-4">
                <div className="flex justify-between">
                  <span className="text-xs text-text-secondary">←</span>
                  <span className="text-xs text-text-secondary">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRoutes;