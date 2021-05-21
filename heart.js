class Heart {
  constructor(_w, _h) {
    this.w = _w;
    this.h = _h;
    this.x = random(width *0.14, width *0.85);
    this.y = 0 + height *0.35;

  }

  display(){
    // rect(this.x, this.y , this.w, this.h);

    push();

    image(heartImg, this.x, this.y , this.w, this.h);
pop();
  }

move(){
this.y++;
}
}
