class Neighbourhood {
  constructor(name) {
    this.name = name;

    return this;
  }

  async getData() {
    const response = await fetch(browser.extension.getURL("dataset.json"));
    const data = await response.json();

    const filteredData = data.filter((row) => row.bu_naam === this.name);

    const sortedData = filteredData.sort((a, b) => b.jaar - a.jaar);

    const neighbourhoodData = sortedData[0];

    console.log(this.name);

    return [
      new Dimension("environment", "Fysieke omgeving", neighbourhoodData.fys),
      new Dimension("nuisance", "Overlast", neighbourhoodData.onv),
      new Dimension(
        "socialCohesion",
        "Sociale samenhang",
        neighbourhoodData.soc
      ),
      new Dimension("services", "Voorzieningen", neighbourhoodData.vrz),
      new Dimension("housingSupply", "Woningaanbod", neighbourhoodData.won),
    ];
  }
}
