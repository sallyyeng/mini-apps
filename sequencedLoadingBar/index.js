const container = document.querySelector(".container");
const loaderButton = document.querySelector("button");
const bar = document.querySelector(".bar");

let isProcessing = false;
let barsToLoad = [];

const loadCurrBatchOfBars = async () => {
  isProcessing = true;

  for (let i = 0; i < barsToLoad.length; i++) {
    let loadBar = barsToLoad[i];
    await loadBar();
  }

  barsToLoad = [];
  isProcessing = false;
};

const addLoader = () => {
  let newBar = bar.cloneNode(true);
  container.appendChild(newBar);

  const load = () =>
    new Promise(resolve => {
      // setTimeout duration should EQUAL the style transition duration
      // to ensure that we give the style enough time to transition
      // async/await isn't smart enough to wait for css transitions
      setTimeout(() => {
        newBar.firstElementChild.className = "progress active";
        resolve();
      }, 1000);
    });

  // continue pushing new bars to load
  barsToLoad.push(load);

  // if it's already processing, let it finish processing the current batch
  // new loaders will be added to the batch even when it's still processing
  // if it's not processing anymore, restart the processing since we have a new loader
  if (!isProcessing) {
    loadCurrBatchOfBars();
  }
};

loaderButton.addEventListener("click", addLoader);
