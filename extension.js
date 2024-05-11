class neighbourhoodData {
  constructor() {
    this.deviation = 0;
    this.environment = 0;
    this.nuisance = 0;
    this.socialCohesion = 0;
    this.services = 0;
    this.housingSupply = 0;
  }

  async getNeighbourhoodData(buurt) {
    const response = await fetch(browser.extension.getURL("dataset.json"));
    const data = await response.json();

    const filteredData = data.filter((row) => row.bu_naam === buurt);

    const sortedData = filteredData.sort((a, b) => b.jaar - a.jaar);

    const neighbourhoodData = sortedData[0];

    this.deviation = neighbourhoodData.afw;
    this.environment = neighbourhoodData.fys;
    this.nuisance = neighbourhoodData.onv;
    this.socialCohesion = neighbourhoodData.soc;
    this.services = neighbourhoodData.vrz;
    this.housingSupply = neighbourhoodData.won;
  }

  getAsElement(title, data) {
    const triangle =
      data < 0
        ? `<div style="width: 0; height: 0;border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 16px solid red;"></div>`
        : `<div style="width: 0; height: 0;border-left: 8px solid transparent; border-right: 8px solid transparent; border-bottom: 16px solid green;"></div>`;

    return `
        <div style="display: flex; flex-direction: column; gap: 2px;">
            <span>${title}</span>
            <div style="display: flex; gap: 6px; align-items: center;">
                ${triangle}
                <span class="font-bold" style="font-size: 1.25rem">${Number(
                  Math.round(data + "e2") + "e-2"
                )}</span>
            </div>
        </div>`;
  }
}

(async () => {
  let buurt = document.getElementsByClassName(
    "fd-m-left-2xs--bp-m fd-display-block fd-display-inline--bp-m"
  )[0].innerText;
  let targetContainer = document.getElementsByClassName("object-primary")[0];

  let container = document.createElement("div");
  container.style = `display: flex; flex-wrap: wrap; gap: 6px; align-items: center; justify-content: space-between; padding-bottom: 1rem; margin-bottom: 1rem; border-bottom: 1px solid #ededed`;

  let data = new neighbourhoodData();
  await data.getNeighbourhoodData(buurt);

  container.innerHTML += data.getAsElement(
    "Fysieke omgeving",
    data.environment
  );
  container.innerHTML += data.getAsElement("Overlast", data.nuisance);
  container.innerHTML += data.getAsElement(
    "Sociale samenhang",
    data.socialCohesion
  );
  container.innerHTML += data.getAsElement("Voorzieningen", data.services);
  container.innerHTML += data.getAsElement(
    "Woningvoorraad",
    data.housingSupply
  );

  targetContainer.prepend(container);
})();
