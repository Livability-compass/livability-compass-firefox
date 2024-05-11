const getTargetContainerFromPage = () => {
  // New details page
  let element = document.getElementsByClassName(
    "mt-4 px-4 lg:mt-6 lg:w-[70%] lg:pr-6"
  )[0];

  // Old details page
  if (!element) {
    element = document.getElementsByClassName("object-primary")[0];
  }

  return element;
};

const getPostalCodeFromPage = () => {
  let postalCode;

  const regex = /\d{4} [A-Z]{2}/;

  postalCode = document.title.match(regex)[0];

  postalCode = postalCode.replace(/\D+/g, "").trim();

  return postalCode;
};

(async () => {
  let postalCodeText = getPostalCodeFromPage();
  let targetContainer = getTargetContainerFromPage();

  if (!targetContainer || !postalCodeText) return;

  let postalCode = new PostalCode(postalCodeText);

  await postalCode.getData();

  render(postalCode, targetContainer, false);
})();
