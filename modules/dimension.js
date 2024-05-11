class Dimension {
  constructor(key, text, score) {
    this.score = score;
    this.text = text;
    this.scoreRounded = Number(Math.round(this.score + "e2") + "e-2");
    this.key = key.trim().replace(/\s/g, "_");

    return this;
  }

  toNode() {
    const triangleCSS =
      this.score < 0
        ? "border-top: 12px solid red;"
        : "border-bottom: 12px solid green;";

    return `
      <div id="${this.key}" style="display: flex; flex-direction: column; gap: 2px;">
        <span class="text-neutral-50 md:inline-block">${this.text}</span>
        <div style="display: flex; gap: 6px; align-items: center;">
          <div style="width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; ${triangleCSS}"></div>
          <span class="font-bold">${this.scoreRounded}</span>
        </div>
      </div>`;
  }
}
