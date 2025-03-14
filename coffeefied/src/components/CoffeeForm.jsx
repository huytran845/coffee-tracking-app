// Node Modules
import { coffeeOptions } from "../utilities";
import { useState } from "react";

// Components
import Authentication from "./Authentication";
import Modal from "./Modal";
import { useAuth } from "../context/AuthContext";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

const CoffeeForm = (props) => {
  const { isAuthenticated } = props;
  const { globalUser, globalData, setGlobalData } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [showCoffeeTypes, setShowCoffeeTypes] = useState(false);
  const [coffeeCost, setCoffeeCost] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  async function handleSubmitForm() {
    if (!isAuthenticated) {
      setShowModal(true);
      return;
    }

    // If there is no coffee selected, then prevent the form from being submitted.
    if (!selectedCoffee) {
      return;
    }

    try {
      // Create new data object to house the new data.
      const newGlobalData = {
        ...(globalData || {}),
      };

      // Convert current time entry into a time stamp to put into our new data object.
      const curTime = Date.now();
      const subtractTime = hours * 60 * 60 * 1000 + minutes * 60 * 100;
      const timeStamp = curTime - subtractTime;

      const newData = { name: selectedCoffee, cost: coffeeCost };
      newGlobalData[timeStamp] = newData;

      console.log(timeStamp, selectedCoffee, coffeeCost);

      // Update the globalData to match the new object data we've created, due to React's immutability.
      setGlobalData(newGlobalData);

      // Persist data in the firebase firestore, adding entry by merging the new with current data.
      const userRef = doc(db, "Users", globalUser.uid);
      const res = await setDoc(
        userRef,
        {
          [timeStamp]: newData,
        },
        { merge: true }
      );

      // Resets the entire form after successful logging and submission.
      setSelectedCoffee(null);
      setHours(0);
      setMinutes(0);
      setCoffeeCost(0);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {showModal && (
        <Modal
          handleCloseModal={() => {
            setShowModal(false);
          }}
        >
          <Authentication
            handleCloseModal={() => {
              setShowModal(false);
            }}
          />
        </Modal>
      )}
      <div className="section-header">
        <i className="fa-solid fa-pencil" />
        <h2>Start tracking today!</h2>
      </div>
      <h4>Select your coffee type</h4>
      <div className="coffee-grid">
        {coffeeOptions.slice(0, 5).map((option, optionIndex) => {
          return (
            <button
              onClick={() => {
                setSelectedCoffee(option.coffeeName);
                setShowCoffeeTypes(false);
              }}
              className={
                "button-card " +
                (option.coffeeName === selectedCoffee
                  ? "coffee-button-selected"
                  : "")
              }
              key={optionIndex}
            >
              <h4>{option.coffeeName}</h4>
              <p>{option.caffeine} mg</p>
            </button>
          );
        })}
        <button
          onClick={() => {
            setShowCoffeeTypes(true);
            setSelectedCoffee(null);
          }}
          className={
            "button-card " + (showCoffeeTypes ? "coffee-button-selected" : "")
          }
        >
          <h4>Other</h4>
          <p>N/A</p>
        </button>
      </div>
      {showCoffeeTypes && (
        <select
          onChange={(selectEvent) => {
            setSelectedCoffee(selectEvent.target.value);
          }}
          id="coffee-list"
          name="coffee-list"
        >
          <option value={null}>Select coffee type</option>
          {coffeeOptions.map((option, optionIndex) => {
            return (
              <option value={option.coffeeName} key={optionIndex}>
                {option.coffeeName} {option.caffeine} mg
              </option>
            );
          })}
        </select>
      )}
      <h4>Add the cost ($)</h4>
      <input
        className="w-full"
        type="number"
        value={coffeeCost}
        onChange={(costEvent) => {
          setCoffeeCost(costEvent.target.value);
        }}
        placeholder="6.90"
      />
      <h4>Time since last consumption</h4>
      <div className="time-entry">
        <div>
          <h6>Hours</h6>
          <select
            onChange={(hourEvent) => {
              setHours(hourEvent.target.value);
            }}
            id="hours-select"
          >
            {[
              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
              19, 20, 21, 22, 23,
            ].map((hour, hourIndex) => {
              return (
                <option key={hourIndex} value={hour}>
                  {hour}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <h6>Minutes</h6>
          <select
            onChange={(minEvent) => {
              setMinutes(minEvent.target.value);
            }}
            id="mins-select"
          >
            {[0, 5, 10, 15, 30, 45].map((min, minIndex) => {
              return (
                <option key={minIndex} value={min}>
                  {min}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <button onClick={handleSubmitForm}>
        <p>Add Entry</p>
      </button>
    </>
  );
};

export default CoffeeForm;
