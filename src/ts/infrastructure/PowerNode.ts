import { Drawable, Updatable, Networkable, Destroyable } from "../util";
import { Network } from "./network";
import * as world from "../environment/world";

let RANGE = 150;

let id = 1;

export class PowerNode
  implements Drawable, Updatable, Networkable, Destroyable {
  x: number;
  y: number;
  id: number = id++;
  network = new Network(this);
  radius: number = 4;
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

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    if (this.network.powered) {
      ctx.fill();
    } else {
      ctx.stroke();
      ctx.fillStyle = "black";
      ctx.fill();
    }

    const size = this.network.global.size;
    const id = this.id;
    ctx.fillStyle = "white";
    ctx.fillText(`${id}, ${size}`, this.x, this.y - 20);
  }
}
