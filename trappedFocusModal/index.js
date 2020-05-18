// https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element

const openModalButton = document.querySelector(".openModal");
const closeModalButton = document.querySelector(".closeModal");
const dialogWindow = document.querySelector("dialog");

let elementToReturnFocus;

function trapFocus(element) {
  // find all focusable elements
  // init first and last focusable element
  // on tab keydown, if active is lastFocusable, redirect next focus to firstFocusable
  // on tab keydown AND shift, if active is firstFocusable, redirect next focus to lastFocusable
  const focusableElements = element.querySelectorAll(
    'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  const redirectFirstAndLastFocus = e => {
    const isTabPressed = e.key === "Tab" || e.keyCode === 9;

    if (!isTabPressed) return;

    if (e.shiftKey) {
      // if active element is first element, focus the last element + preventDefault
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      // if active element is last element, focus first element + preventDefault
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  };

  element.addEventListener("keydown", redirectFirstAndLastFocus);
}

function handleOpenModal() {
  dialogWindow.showModal();
  trapFocus(dialogWindow);
  elementToReturnFocus = this;
}

function handleCloseModal() {
  dialogWindow.close();
  elementToReturnFocus.focus();
  console.log(document.activeElement);
}

openModalButton.addEventListener("click", handleOpenModal);
closeModalButton.addEventListener("click", handleCloseModal);
