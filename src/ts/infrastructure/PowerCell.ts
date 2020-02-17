import { Drawable, Networkable, Destroyable } from "../util";
import * as world from "../environment/world";
import { Network } from "./network";
import { powerNode as isPowerNode } from "../is";

const RANGE = 150;

export class PowerCell implements Drawable, Networkable, Destroyable {
  x: number;
  y: number;
  ghost = false;
  powered = true;
  network: Network = new Network(this, isPowerNode);
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
    Network.render(ctx, this);

    ctx.fillStyle = "magenta";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
