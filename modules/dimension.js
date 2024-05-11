class Dimension {
  constructor(key, text, score) {
    this.score = score * 10;
    this.text = text;
    this.scoreRounded = Number(Math.round(this.score + "e2") + "e-2");
    this.key = key.trim().replace(/\s/g, "_");

    return this;
  }

  getScoreColor() {
    if (this.score >= 0.25) return "#37CE31";

    if (this.score <= -0.25) return "#CE3137";

    return "#3137CE";
  }

  async getScoreIcon() {
    let icon = "equal";

    if (this.scoreRounded < -0.25) icon = "low";
    if (this.scoreRounded < -1) icon = "low-three";
    if (this.scoreRounded < -0.5) icon = "low-two";
    if (this.scoreRounded < -1.5) icon = "low-four";
    if (this.scoreRounded > 0.25) icon = "high";
    if (this.scoreRounded > 0.5) icon = "high-two";
    if (this.scoreRounded > 1) icon = "high-three";
    if (this.scoreRounded > 1.5) icon = "high-four";

    const response = await fetch(
      browser.extension.getURL(`assets/${icon}.svg`)
    );

    return await response.text();
  }

  async toNode() {
    this.getScoreIcon();

    return `
      <div id="${
        this.key
      }" style="display: flex; flex-direction: column; gap: 2px;">
        <span class="text-neutral-50 md:inline-block">${this.text}</span>
        <div style="display: flex; gap: 6px; align-items: center; color: ${this.getScoreColor()}">
          ${await this.getScoreIcon()}
          <span class="font-bold">${this.scoreRounded}</span>
        </div>
      </div>`;
  }
}
