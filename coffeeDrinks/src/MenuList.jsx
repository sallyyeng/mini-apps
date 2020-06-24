import React from "react";
import PropTypes from "prop-types";

import { COFFEES } from "./constants.js";
import { DrinksList } from "./components";

const Menu_Drinks_Title = "Menu";

function MenuList({ onMenuDrinkClick }) {
  const handleMenuDrinkClick = e => {
    const clickedDrink = e.target.innerText;
    console.log(clickedDrink);
    onMenuDrinkClick(clickedDrink);
  };

  return (
    <DrinksList
      className="menu"
      drinks={Object.keys(COFFEES)}
      onDrinkClick={handleMenuDrinkClick}
      title={Menu_Drinks_Title}
    />
  );
}

MenuList.propTypes = {
  onMenuDrinkClick: PropTypes.func.isRequired
};

export default MenuList;
