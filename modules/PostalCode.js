class PostalCode {
  constructor(postalCode) {
    this.postalCode = postalCode;
  }

  getPostalCode() {
    return this.postalCode;
  }

  async getData() {
    const response = await fetch(browser.runtime.getURL("data/pc4.json"));
    const data = await response.json();

    const filteredData = data.filter((row) => row.PC4 == this.postalCode);

    const sortedData = filteredData.sort((a, b) => b.jaar - a.jaar);

    const postalCodeData = sortedData[0];

    if (!postalCodeData) {
      return undefined;
    }

    return [
      new Dimension("environment", "Fysieke omgeving", postalCodeData.fys),
      new Dimension("nuisance", "Overlast", postalCodeData.onv),
      new Dimension("socialCohesion", "Sociale samenhang", postalCodeData.soc),
      new Dimension("services", "Voorzieningen", postalCodeData.vrz),
      new Dimension("housingSupply", "Woningaanbod", postalCodeData.won),
    ];
  }
}
