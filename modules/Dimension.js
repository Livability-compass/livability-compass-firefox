class Dimension {
  constructor(key, text, score) {
    this.score = score * 10;
    this.text = text;
    this.scoreRounded = Number(Math.round(this.score + "e2") + "e-2");
    this.key = key.trim().replace(/\s/g, "_");

    return this;
  }

  getScoreColor() {
    if (this.score > 0.25) return "#37CE31";

    if (this.score < -0.25) return "#CE3137";

    return "#3137CE";
  }

  async getScoreIcon() {
    if (this.score < -1.5) return "low-four";
    if (this.score < -1) return "low-three";
    if (this.score < -0.5) return "low-two";
    if (this.score < -0.25) return "low";

    if (this.score > 1.5) return "high-four";
    if (this.score > 1) return "high-three";
    if (this.score > 0.5) return "high-two";
    if (this.score > 0.25) return "high";

    return "equal";
  }

  async getSvg(name) {
    const response = await fetch(browser.runtime.getURL(`assets/${name}.svg`));

    return await response.text();
  }

  async toNode() {
    const svg = await this.getSvg(await this.getScoreIcon());

    return `
      <div id="${
        this.key
      }" style="display: flex; flex-direction: column; gap: 2px;">
        <span class="text-neutral-50 md:inline-block" style="text-overflow: ellipsis;">${
          this.text
        }</span>
        <div style="display: flex; gap: 6px; align-items: center; color: ${this.getScoreColor()}">
          ${svg}
          <span class="font-bold">${this.scoreRounded}</span>
        </div>
      </div>`;
  }
}
