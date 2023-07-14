class Spinner {
  constructor(containerElement) {
    this.containerElement = containerElement;
  }

  start() {
    this.containerElement.style.display = "flex";
  }

  stop() {
    this.containerElement.style.display = "none";
  }
}

module.exports = Spinner;
