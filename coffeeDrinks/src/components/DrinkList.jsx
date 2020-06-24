import React from "react";
import PropTypes from "prop-types";

function DrinksList({ drinks, onDrinkClick, title, ...restProps }) {
  const renderDrinks = () => {
    return drinks.map((drink, index) => (
      <li key={`drinks-${index}`} onClick={onDrinkClick}>
        {drink}
      </li>
    ));
  };

  return (
    <div {...restProps}>
      <p>{title}</p>
      <ol className="drinks_list">{renderDrinks()}</ol>
    </div>
  );
}

DrinksList.propTypes = {
  className: PropTypes.string,
  drinks: PropTypes.array.isRequired,
  onDrinkClick: PropTypes.func,
  title: PropTypes.string.isRequired
};

export default DrinksList;
