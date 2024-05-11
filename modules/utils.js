const render = async (postalCode, targetContainer, standalone = true) => {
  document.getElementById("leefbaarometer")?.remove();

  let container = document.createElement("div");
  container.id = "leefbaarometer";

  if (standalone) {
    container.style = `display: flex; flex-direction: column; gap: 8px; padding: 1rem;`;
  } else {
    container.style = `display: flex; flex-direction: column; gap: 8px; padding-bottom: 1rem; margin-bottom: 1rem; border-bottom: 1px solid #ededed`;
  }

  if (!postalCode.data) {
    container.innerHTML = `<div>Geen leefbaarheidsgegevens gevonden voor postcode gebied ${postalCode.getPostalCode()}.</div>`;
  } else {
    let template = `<div style="display: flex; align-items: stretch; justify-content: space-between; gap: 12px;">`;

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

  targetContainer.insertBefore(container, targetContainer.childNodes[0]);
};
