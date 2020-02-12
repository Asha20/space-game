import { Drawable } from "./util";

export class Asteroid implements Drawable {
  x: number;
  y: number;
  radius: number;
  width: number;
  height: number;

  constructor(x: number, y: number, radius: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.width = radius * 2;
    this.height = radius * 2;
  }

  draw(ctx: CanvasRenderingContext2D) {
    console.log("hi");
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
