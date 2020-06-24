import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { DrinksList } from "./components";
import { COFFEES } from "./constants.js";

const Ordered_Drinks_Title = "Ordered Drinks";

function OrderedList({
  drinks,
  firstUnmadeDrinkIndex,
  setFirstUnmadeDrinkIndex
}) {
  const [isMakingDrinks, setIsMakingDrinks] = useState(false);
  const [displayedOrders, setDisplayedOrders] = useState([drinks]);

  useEffect(() => {
    setDisplayedOrders(drinks.slice(firstUnmadeDrinkIndex));
  }, [drinks, firstUnmadeDrinkIndex]);

  useEffect(() => {
    if (!isMakingDrinks) {
      makeDrink();
    }
  }, [drinks, firstUnmadeDrinkIndex, makeDrink]);

  async function makeDrink() {
    setIsMakingDrinks(true);
    let i;

    for (i = firstUnmadeDrinkIndex; i < drinks.length; i++) {
      setFirstUnmadeDrinkIndex(i);
      const currDrink = drinks[i];
      const makeTime = COFFEES[currDrink] * 1000;
      await new Promise(resolve => setTimeout(() => resolve(), makeTime));
    }

    setIsMakingDrinks(false);
    setFirstUnmadeDrinkIndex(i);
  }

  return <DrinksList drinks={displayedOrders} title={Ordered_Drinks_Title} />;
}

OrderedList.propTypes = {
  drinks: PropTypes.array.isRequired,
  firstUnmadeDrinkIndex: PropTypes.number.isRequired,
  setFirstUnmadeDrinkIndex: PropTypes.func.isRequired
};

export default OrderedList;
