import { Drawable, Updatable, Networkable, Destroyable } from "../util";
import { Network } from "./network";
import * as world from "../environment/world";

let RANGE = 150;

export class PowerNode
  implements Drawable, Updatable, Networkable, Destroyable {
  x: number;
  y: number;
  ghost = false;
  network: Network = new Network(this);
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
    Network.render(ctx, this);

    ctx.fillStyle = this.network.powered ? "white" : "red";
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
    ctx.fillStyle = "white";
    ctx.fillText(`${size}`, this.x, this.y - 20);
  }
}
