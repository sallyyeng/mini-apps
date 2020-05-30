const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

let cities = [];

async function getCities() {
  try {
    let response = await fetch(endpoint);
    cities = await response.json();
  } catch (e) {
    alert("failed to fetch cities with error: ", e);
  }
}

// fetch cities
getCities();

// filter cities
const findMatches = (wordToMatch, list) => {
  let matchingRegEx = new RegExp(wordToMatch, "gi");

  return list.filter(
    ({ city, state }) => city.match(matchingRegEx) || state.match(matchingRegEx)
  );
};

// showMatches
function displayCities(searchValue) {
  const suggestedCities = findMatches(searchValue, cities);

  const suggestedCitiesTemplate = suggestedCities
    .map(({ state, city }) => {
      const searchedRegExp = new RegExp(searchValue, "gi");
      const cityHighlighted = city.replace(
        searchedRegExp,
        `<span class="hl">${searchValue}</span>`
      );
      const stateHighlighted = state.replace(
        searchedRegExp,
        `<span class="hl">${searchValue}</span>`
      );

      return `
          <li class="suggestion">
            <span>${cityHighlighted}</span>
            <span>${stateHighlighted}</span>
          </li>
        `;
    })
    .join("");

  suggestions.innerHTML = suggestedCitiesTemplate;
}

function debounce(callback, delay) {
  return function(args) {
    // if a timer is already running, clear it
    if (this.lastCallTimer) {
      clearTimeout(this.lastCallTimer);
    }

    // set a timer
    this.lastCallTimer = setTimeout(() => callback(args), delay);
  };
}

// using function declaration/expression
function throttledCB() {
  console.log("this func: ", this);
  debounce(displayCities, 300)(this.value);
}

// // using fat arrow function
// const throttledCB = e => {
//   console.log("this fat arrow: ", this);
//   debounce.apply(this, [displayCities, 300])(e.target.value);
// };

// select elements
const suggestions = document.querySelector(".suggestions");
const searchInput = document.querySelector("input.search");

// with throttle
searchInput.addEventListener("keyup", throttledCB);
// without throttle
// searchInput.addEventListener("keyup", displayCities);
