import { Drawable, Networkable, Destroyable } from "../util";
import * as world from "../environment/world";
import { Network } from "./network";

const RANGE = 150;

export class PowerCell implements Drawable, Networkable, Destroyable {
  x: number;
  y: number;
  powered = true;
  network = new Network(this);
  radius: number = 32;
  width: number = this.radius * 2;
  height: number = this.radius * 2;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.update();
  }

  update() {
    this.network.recalculate(RANGE);
  }

  destroy() {
    world.destroy(this);
    this.network.recalculate(0);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = ctx.fillStyle = this.network.powered ? "white" : "red";

    for (const target of this.network.local) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(target.x, target.y);
      ctx.stroke();
    }

    ctx.fillStyle = "magenta";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
