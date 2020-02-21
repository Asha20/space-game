import { staticImplements, Buildable } from "../util";
import { rgby } from "../environment/world";
import { Infrastructure } from "./Infrastructure";
import { powerNode as isPowerNode } from "../is";
import { Network } from "./network";

staticImplements<Buildable, typeof PowerCell>();
export class PowerCell extends Infrastructure {
  network: Network = new Network(this, isPowerNode);
  radius = 32;
  width = this.radius * 2;
  height = this.radius * 2;

  static cost = rgby(20);
  static description = "Supplies power to the network.";
  static display = new PowerCell(0, 0);

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
    ctx.fillStyle = "magenta";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
