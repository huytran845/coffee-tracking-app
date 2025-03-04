import { coffeeOptions } from "../utilities";

const CoffeeForm = () => {
  return (
    <>
      <div className="section-header">
        <i className="fa-solid fa-pencil" />
        <h2>Start tracking today!</h2>
      </div>
      <h4>Select your coffee type</h4>
      <div className="coffee-grid">
        {coffeeOptions.slice(0, 5).map((option, optionIndex) => {
          return (
            <button className="button-card" key={optionIndex}>
              <h4>{option.coffeeName}</h4>
              <p>{option.caffeine} mg</p>
            </button>
          );
        })}
      </div>
    </>
  );
};

export default CoffeeForm;
