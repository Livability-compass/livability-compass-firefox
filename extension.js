// Photo by <a href="https://unsplash.com/@esthergrl1?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Esther Gorlee</a> on <a href="https://unsplash.com/photos/red-tulip-flowers-under-calm-blue-sky--uGmFjqkHFU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

(async () => {
  let neighbourhoodName = getNeighbourhoodFromPage();
  let targetContainer = getTargetContainerFromPage();

  if (!targetContainer || !neighbourhoodName) return;

  let container = document.createElement("div");
  container.style = `display: flex; flex-direction: column; gap: 8px; padding-bottom: 1rem; margin-bottom: 1rem; border-bottom: 1px solid #ededed`;

  let neighbourhood = new Neighbourhood(neighbourhoodName);
  let data = await neighbourhood.getData();

  if (!data) {
    container.innerHTML = `<div>Geen leefbaarheidsgegevens gevonden voor ${neighbourhoodName}.</div>`;
  } else {
    let template = `<div style="display: flex; flex-wrap: wrap; align-items: stretch; justify-content: space-between;">`;

    for (let i = 0; i < data.length; i++) {
      template += await data[i].toNode();

      if (i < data.length - 1) {
        template += `<div style="width: 1px; background-color: #ededed"></div>`;
      }
    }

    template += `</div>`;

    template += `
      <a target="_blank" href="https://leefbaarometer.nl/home.php" class="text-secondary-70 hover:text-secondary-70-darken-1 flex gap-2 font-normal">Bron: Leefbaarometer</a>
    `;

    container.innerHTML += template;
  }

  targetContainer.prepend(container);
})();
