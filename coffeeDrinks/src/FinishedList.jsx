import React from "react";
import PropTypes from "prop-types";

import { DrinksList } from "./components";

const Finished_Drinks_Title = "Finished Drinks";

function FinishedList({ drinks }) {
  return <DrinksList drinks={drinks} title={Finished_Drinks_Title} />;
}

FinishedList.propTypes = {
  drinks: PropTypes.array.isRequired
};

export default FinishedList;
