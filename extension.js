(async () => {
  let buurt = document.getElementsByClassName(
    "ml-2 text-secondary-70 hover:text-secondary-70-darken-1"
  )[0].innerText;
  let targetContainer = document.getElementsByClassName(
    "mt-4 px-4 lg:mt-6 lg:w-[70%] lg:pr-6"
  )[0];

  let container = document.createElement("div");
  container.style = `display: flex; flex-wrap: wrap; gap: 6px; align-items: stretch; justify-content: space-between; padding-bottom: 1rem; margin-bottom: 1rem; border-bottom: 1px solid #ededed`;

  let neighbourhood = new Neighbourhood(buurt);
  let data = await neighbourhood.getData();

  for (let i = 0; i < data.length; i++) {
    container.innerHTML += await data[i].toNode();

    if (i < data.length - 1) {
      container.innerHTML += `<div style="width: 1px; background-color: #ededed"></div>`;
    }
  }

  targetContainer.prepend(container);
})();
