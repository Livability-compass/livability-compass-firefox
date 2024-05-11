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

const getPostalCodeFromPage = () => {
  let postalCode = undefined;

  // Detail pages
  const regex = /\d{4} [A-Z]{2}/;
  const match = document.title.match(regex)[0];

  postalCode = match;

  postalCode = postalCode.replace(/\s/g, "").slice(0, -2);

  return postalCode;
};
