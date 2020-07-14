import { is, shape, health, rgby1 } from "@/util";
import { Infrastructure } from "./Infrastructure";
import * as Network from "./network";

const STATIC = Object.freeze({
  cost: rgby1(20),
  description: "Supplies power to the network.",
});

export class PowerCell extends Infrastructure {
  static = STATIC;
  network = Network.create(this, is.powerNode);
  shape = shape.circle(32);
  health = health(200);

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
    ctx.fillStyle = "magenta";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.shape.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
