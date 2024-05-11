const getTargetContainerFromPage = () => {
  // New details page
  let element = document.getElementsByClassName(
    "mt-4 px-4 lg:mt-6 lg:w-[70%] lg:pr-6"
  )[0];

  // Old details page
  if (!element) {
    element = document.getElementsByClassName("object-primary")[0];
  }

  if (!element) {
    return undefined;
  }

  return element;
};

const getNeighbourhoodFromPage = () => {
  // New details page
  let element = document.getElementsByClassName(
    "ml-2 text-secondary-70 hover:text-secondary-70-darken-1"
  )[0];

  // Old details page
  if (!element) {
    element = document.getElementsByClassName(
      "fd-m-left-2xs--bp-m fd-display-block fd-display-inline--bp-m"
    )[0];
  }

  if (!element) {
    return undefined;
  }

  return element.innerText;
};
