const Home = () => {
  // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      {/* Your component's content */}
      <div className="hero h-screen w-screen ">
        <div className="hero-content text-center">
          <div className="max-w-lg">
            <h1 className="text-5xl font-bold">
              Hello there! welcome to RollRush
            </h1>
            <p className="py-6">
              Specifically, We showcase the casino roulette game where players
              can place bets and spin the roulette to win or lose. Watch the
              Loom to see the gameplay and learn more about our plans to develop
              this into an actual product.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
