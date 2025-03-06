// Node Modules
import {
  calculateCurrentCaffeineLevel,
  coffeeConsumptionHistory,
  getCaffeineAmount,
  timeSinceConsumption,
} from "../utilities";

const History = () => {
  return (
    <>
      <div className="section-header">
        <i className="fa-solid fa-timeline" />
        <h2>History</h2>
      </div>
      <p>
        <i>Hover over for more info!</i>
      </p>
      <div className="coffee-history">
        {Object.keys(coffeeConsumptionHistory)
          .sort((a, b) => b - a)
          .map((utcTime, coffeeIndex) => {
            const coffee = coffeeConsumptionHistory[utcTime];
            const timeSinceConsume = timeSinceConsumption(utcTime);
            const originalAmount = getCaffeineAmount(coffee.name);
            const remainingAmount = calculateCurrentCaffeineLevel({
              [utcTime]: coffee,
            });

            const summary = `${coffee.name} | ${timeSinceConsume} | $${coffee.cost} | ${originalAmount} mg / ${remainingAmount} mg`;

            return (
              <div title={summary} key={coffeeIndex}>
                <i className="fa-solid fa-mug-hot" />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default History;
