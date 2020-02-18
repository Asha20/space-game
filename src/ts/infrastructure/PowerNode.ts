import {
  Drawable,
  Updatable,
  Networkable,
  Destroyable,
  Selectable,
} from "../util";
import { Network } from "./network";
import * as world from "../environment/world";

let RANGE = 150;

export class PowerNode
  implements Drawable, Updatable, Networkable, Destroyable, Selectable {
  x: number;
  y: number;
  selected = false;
  artificial = true;
  ghost = false;
  network: Network = new Network(this);
  radius = 4;
  width = this.radius * 2;
  height = this.radius * 2;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  update() {}

  destroy() {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = ctx.strokeStyle = this.network.powered ? "white" : "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    if (this.network.powered) {
      ctx.fill();
    } else {
      ctx.stroke();
    }

    const size = this.network.global.size;
    ctx.fillStyle = "white";
    ctx.fillText(`${size}`, this.x, this.y - 20);
  }
}
