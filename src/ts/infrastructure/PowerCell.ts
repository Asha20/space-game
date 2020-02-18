import { Drawable, Networkable, Destroyable, Selectable } from "../util";
import * as world from "../environment/world";
import { Network } from "./network";
import { powerNode as isPowerNode } from "../is";

const RANGE = 150;

export class PowerCell
  implements Drawable, Networkable, Destroyable, Selectable {
  x: number;
  y: number;
  selected = false;
  artificial = true;
  ghost = false;
  network: Network = new Network(this, isPowerNode);
  radius = 32;
  width = this.radius * 2;
  height = this.radius * 2;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  update() {}

  destroy() {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "magenta";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
