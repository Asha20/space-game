import { Drawable } from "../util";
import { Asteroid } from "../environment/asteroid";
import * as world from "../environment/world";

const RANGE = 150;

export class Miner implements Drawable {
  x: number;
  y: number;
  radius: number = 16;
  width: number = this.radius * 2;
  height: number = this.radius * 2;
  targets: Asteroid[] = [];

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.targets = world.asteroids.filter(as => {
      return Math.hypot(as.x - this.x, as.y - this.y) <= RANGE;
    });

    ctx.strokeStyle = "white";
    for (const target of this.targets) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(target.x, target.y);
      ctx.stroke();
    }

    ctx.fillStyle = "purple";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
