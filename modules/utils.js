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

const render = async (postalCode, targetContainer) => {
  document.getElementById("leefbaarometer")?.remove();

  let container = document.createElement("div");
  container.id = "leefbaarometer";

  container.style = `display: flex; flex-direction: column; gap: 8px; padding-bottom: 1rem; margin-bottom: 1rem; border-bottom: 1px solid #ededed`;

  if (!postalCode.data) {
    container.innerHTML = `<div>Geen leefbaarheidsgegevens gevonden voor postcode gebied ${postalCode.getPostalCode()}.</div>`;
  } else {
    let template = `<div style="display: flex; flex-wrap: wrap; align-items: stretch; justify-content: space-between;">`;

    for (let i = 0; i < postalCode.data.length; i++) {
      template += await postalCode.data[i].toNode();

      if (i < postalCode.data.length - 1) {
        template += `<div style="width: 1px; background-color: #ededed"></div>`;
      }
    }

    template += `</div>`;

    template += `<div style="display: flex; justify-content: space-between;">
      <span class="text-neutral-40">Op basis van postcodegebied ${postalCode.getPostalCode()}</span>
      <a target="_blank" href="https://leefbaarometer.nl/home.php" class="text-secondary-70 hover:text-secondary-70-darken-1 flex gap-2 font-normal">Bron: Leefbaarometer</a>
    </div>`;

    container.innerHTML += template;
  }

  targetContainer.prepend(container);
};
