// Photo by <a href="https://unsplash.com/@esthergrl1?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Esther Gorlee</a> on <a href="https://unsplash.com/photos/red-tulip-flowers-under-calm-blue-sky--uGmFjqkHFU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

(async () => {
  let postalCodeText = getPostalCodeFromPage();
  let targetContainer = getTargetContainerFromPage();

  if (!targetContainer || !postalCodeText) return;

  let postalCode = new PostalCode(postalCodeText);

  await postalCode.getData();

  render(postalCode, targetContainer);
})();
