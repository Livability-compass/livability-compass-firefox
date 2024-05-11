const getTargetContainerFromPage = () => {
  element = document.getElementsByClassName(
    "bg-white mr-2 w-full shrink-0 overflow-hidden rounded"
  )[0];

  return element;
};

const getPostalCodeFromPage = () => {
  let postalCode = document.querySelectorAll(
    `[data-test-id="postal-code-city"]`
  )[0];

  return postalCode.textContent.replace(/\D+/g, "").trim();
};

(async () => {
  let nodeToBeObserved = document.getElementsByClassName(
    "relative flex h-full flex-col overflow-x-hidden"
  )[0];

  if (!nodeToBeObserved) return;

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        setTimeout(() => {
          let targetContainer = getTargetContainerFromPage();
          let postalCodeText = getPostalCodeFromPage();

          if (!targetContainer || !postalCodeText) return;

          let postalCode = new PostalCode(postalCodeText);

          postalCode.getData().then(() => {
            render(postalCode, targetContainer);
          });
        }, 300);
      }
    });
  });

  observer.observe(nodeToBeObserved, {
    childList: true,
  });
})();
