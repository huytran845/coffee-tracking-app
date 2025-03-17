// The hero section of the page just displays basic information for the user to get a grasp of the app.
const Hero = () => {
  return (
    <>
      <h1>Coffee Tracker for Coffee Consumers!</h1>
      <div className="benefits-list">
        <h3 className="font-bolder">
          Try <span className="text-gradient">Coffiefied</span> and start...
        </h3>
        <p>✅ Tracking ever coffee</p>
        <p>✅ Measuring your blood caffeine levels</p>
        <p>✅ Costing and quantifying your addition</p>
      </div>
      <div className="card info-card">
        <div>
          <i className="fa-solid fa-circle-info"></i>
          <h3>Did you know...</h3>
        </div>
        <h5>That caffeine&apos;s half-life is about 5 hours?</h5>
        <p>
          This means that after 5 hours, half the caffeine you consumed is still
          in your system, keeping you alert longer! So if you drink a cup of
          coffee with 200mg of caffeine, within 5 hours you&apos;ll still have
          about 100mg of caffeine left in your system.
        </p>
      </div>
    </>
  );
};

export default Hero;
