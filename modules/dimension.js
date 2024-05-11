class Dimension {
  constructor(key, text, score) {
    this.score = score * 10;
    this.text = text;
    this.scoreRounded = Number(Math.round(this.score + "e2") + "e-2");
    this.key = key.trim().replace(/\s/g, "_");

    return this;
  }

  getScoreColor() {
    if (this.score < -1.5) return "#CE3137"; // Zeer grote negatieve afwijking
    if (this.score < -1) return "#A7335D"; // Grote negatieve afwijking
    if (this.score < -0.5) return "#803482"; // Negatieve afwijking
    if (this.score < -0.25) return "#5836A8"; // Kleine negatieve afwijking
    if (this.score < 0.25) return "#3137CE"; // Geen afwijking
    if (this.score < 0.5) return "#335DA7"; // Kleine positieve afwijking
    if (this.score < 1) return "#348280"; // Positieve afwijking
    if (this.score < 1.5) return "#36A858"; // Grote positieve afwijking
    return "#37CE31"; // Zeer grote positieve afwijking
  }

  toNode() {
    let triangleCSS =
      this.score < 0
        ? `border-top: 12px solid ${this.getScoreColor()};`
        : `border-bottom: 12px solid ${this.getScoreColor()};`;

    if (this.score < 0.25 && this.score > -0.25) {
      triangleCSS = `border: 6px solid ${this.getScoreColor()}; border-radius: 100%;`;
    }

    return `
      <div id="${this.key}" style="display: flex; flex-direction: column; gap: 2px;">
        <span class="text-neutral-50 md:inline-block">${this.text}</span>
        <div style="display: flex; gap: 6px; align-items: center;">
          <div style="width: 0; height: 0; border-left: 7px solid transparent; border-right: 7px solid transparent; ${triangleCSS}"></div>
          <span class="font-bold">${this.scoreRounded}</span>
        </div>
      </div>`;
  }
}
