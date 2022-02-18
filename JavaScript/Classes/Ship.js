class Ship {
  constructor() {
    this.currXYCoords = [0, 0];
    this.nextXYCoords = [0, 0];
    this.directionalUnitVector = [0, 0];
    this.currShipRotationRadians = -Math.PI / 2;
    this.shipForwardSpeed = 3;
    this.html = document.querySelector(".ship");
    this.currKeysPressedArray = [];
    this.exhaustParticlesArray = [];
  }

  #createShipExhaust() {
    this.exhaustParticlesArray.forEach((particle) => {
      particle.move();
      particle.draw();
      if (this.exhaustParticlesArray[0].size <= 0.2) {
        this.exhaustParticlesArray[0].remove(this.exhaustParticlesArray);
      }
    });

    this.exhaustParticlesArray.push(
      new Particle(this.directionalUnitVector, this.currXYCoords, this.html)
    );
  }

  #moveForward() {
    if (this.shipForwardSpeed < 8) this.shipForwardSpeed += 0.05;

    this.currXYCoords = this.nextXYCoords;
    objectTransform(
      this.html,
      this.nextXYCoords[0],
      this.nextXYCoords[1],
      this.currShipRotationRadians + Math.PI / 2
    );
    this.#createShipExhaust();
  }

  #moveRotate() {
    objectTransform(
      this.html,
      this.currXYCoords[0],
      this.currXYCoords[1],
      this.currShipRotationRadians + Math.PI / 2
    );
  }

  #resetShipForwardSpeed() {
    this.shipForwardSpeed = 3;
  }
  #updateShipsDirectionalUnitVector() {
    const unitRadius = 1;
    this.directionalUnitVector = polar2Rect(
      this.currShipRotationRadians,
      unitRadius
    );
  }

  #updateShipsNextCoords() {
    this.nextXYCoords = new Array(
      this.currXYCoords[0] +
        this.directionalUnitVector[0] * this.shipForwardSpeed,

      this.currXYCoords[1] +
        this.directionalUnitVector[1] * this.shipForwardSpeed
    );
  }

  #updateShipDirection(direction) {
    if (direction == "left") {
      this.currShipRotationRadians =
        this.currShipRotationRadians - Math.PI / 90;
    }
    if (direction == "right") {
      this.currShipRotationRadians =
        this.currShipRotationRadians + Math.PI / 90;
    }
  }

  eventLoop() {
    this.#updateShipsDirectionalUnitVector();
    this.#updateShipsNextCoords();

    if (this.currKeysPressedArray.includes(38)) {
      this.#moveForward();
    }
    if (this.currKeysPressedArray.includes(37)) {
      this.#updateShipDirection("left");
      this.#moveRotate();
    }
    if (this.currKeysPressedArray.includes(39)) {
      this.#updateShipDirection("right");
      this.#moveRotate();
    }
  }

  handleKeyDown(e) {
    //add Key Press Instruction
    if (this.currKeysPressedArray.includes(e.keyCode) == false) {
      this.currKeysPressedArray.push(e.keyCode);
    }
  }

  handleKeyUp(e) {
    //remove Key Press Instruction
    const keyCodePressedIndex = this.currKeysPressedArray.indexOf(e.keyCode);
    this.currKeysPressedArray.splice(keyCodePressedIndex, 1);

    e.keyCode == "38" && this.#resetShipForwardSpeed();
  }
}
