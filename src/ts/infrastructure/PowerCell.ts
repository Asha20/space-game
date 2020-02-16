import { Drawable, Powerable, Destroyable } from "../util";
import { Infrastructure } from "./common";
import * as world from "../environment/world";
import * as network from "./network";

const RANGE = 150;

export class PowerCell implements Drawable, Powerable, Destroyable {
  x: number;
  y: number;
  powered = true;
  network = new Set<Infrastructure>();
  directNetwork = new Set<Infrastructure>();
  radius: number = 32;
  width: number = this.radius * 2;
  height: number = this.radius * 2;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.update();
  }

  update() {
    network.recalculate(this, RANGE);
  }

  destroy() {
    world.destroy(this);
    network.recalculate(this, 0);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "magenta";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
