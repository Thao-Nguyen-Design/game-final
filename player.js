class Player {
  constructor() {
    this.w = 100;
    this.h = 95;
    this.x = width /2;
    this.y = height - this.w;
    this.speed = 3;
    this.direction = "still";
  }

  display() {
    // rect(this.x, this.y, this.w, this.h);
    push();
    image(playerImg, this.x, this.y -10, this.w, this.h);
    pop();
  }

  move() {
    switch (this.direction) {
      case "still":
        break;
      case "up": //decrease y pos
      if (this.y > height *0.42){
        this.y = this.y - this.speed;
      }
        break;
      case "down": //increase y pos
      if (this.y < height *0.82){
        this.y = this.y + this.speed;
      }
        break;
      case "right": //increase x pos
      if (this.x < width * 0.85){
        this.x = this.x + this.speed;
      }
        break;
      case "left": //decrease x pos
      if (this.x > width *0.17){
        this.x = this.x - this.speed;
      }
        break;
      default:
        break;
    }
  }

}
