import React, { useState, useEffect } from "react";

import MenuList from "./MenuList.jsx";
import FinishedList from "./FinishedList.jsx";
import OrderedList from "./OrderedList.jsx";

import "./styles.css";

export default function App() {
  const [firstUnmadeDrinkIndex, setFirstUnmadeDrinkIndex] = useState(0);
  const [orderedDrinks, setOrderedDrinks] = useState([]);
  const [finishedDrinks, setFinishedDrinks] = useState([]);

  useEffect(() => {
    setFinishedDrinks(orderedDrinks.slice(0, firstUnmadeDrinkIndex));
  }, [firstUnmadeDrinkIndex]);

  const handleMenuDrinkClick = newDrink => {
    const updatedOrderedDrinks = [...orderedDrinks, newDrink];
    setOrderedDrinks(updatedOrderedDrinks);
  };

  return (
    <div className="App">
      <div className="drinks">
        <MenuList onMenuDrinkClick={handleMenuDrinkClick} />
        <OrderedList
          drinks={orderedDrinks}
          firstUnmadeDrinkIndex={firstUnmadeDrinkIndex}
          setFirstUnmadeDrinkIndex={setFirstUnmadeDrinkIndex}
          setFinishedDrinks={setFinishedDrinks}
        />
        <FinishedList drinks={finishedDrinks} />
      </div>
    </div>
  );
}
