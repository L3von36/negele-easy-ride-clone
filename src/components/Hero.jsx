const Hero = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-primary/95 to-primary/90">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-flex items-center px-3 py-1 bg-accent/20 text-accent text-xs font-medium rounded-full mb-6">
          Official Transport Authority
        </span>
        <h1 className="max-w-2xl mx-auto text-3xl font-bold text-white mb-4">
          Travel with <span className="text-accent">confidence</span>
        </h1>
        <p className="max-w-xl mx-auto text-lg text-white/90 mb-8">
          Book your seat in seconds — no account needed
        </p>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
          <div>
            <p className="text-2xl font-semibold text-white">10+</p>
            <p className="text-sm text-white/80">Routes</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-white">50+</p>
            <p className="text-sm text-white/80">Daily Trips</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-white">5K+</p>
            <p className="text-sm text-white/80">Happy Riders</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;