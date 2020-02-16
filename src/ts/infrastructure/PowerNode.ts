import { Drawable, Updatable, Powerable, Destroyable } from "../util";
import { Infrastructure } from "./common";
import * as network from "./network";
import * as world from "../environment/world";

let RANGE = 150;

let id = 1;

export class PowerNode implements Drawable, Updatable, Powerable, Destroyable {
  x: number;
  y: number;
  id: number = id++;
  powered = false;
  network = new Set<Infrastructure>();
  directNetwork = new Set<Infrastructure>();
  radius: number = 4;
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
    ctx.strokeStyle = this.powered ? "white" : "red";
    for (const target of this.directNetwork) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(target.x, target.y);
      ctx.stroke();
    }

    ctx.fillStyle = this.powered ? "white" : "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "white";
    const size = this.network.size;
    const id = this.id;
    ctx.fillText(`${id}, ${size}`, this.x, this.y - 20);
  }
}
