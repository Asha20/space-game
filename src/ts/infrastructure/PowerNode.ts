import { shape, health, rgby1, build } from "@/util";
import { Infrastructure } from "./Infrastructure";
import * as Network from "./network";

const COST = rgby1(2);
const DESCRIPTION = "Used to form networks to transfer power.";

export class PowerNode extends Infrastructure {
  build = build(COST, DESCRIPTION);
  network = Network.create(this);
  shape = shape.circle(4);
  health = health(20);

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
    ctx.fillStyle = ctx.strokeStyle = this.network.ghostPowered
      ? "white"
      : "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.shape.radius, 0, Math.PI * 2);
    if (this.network.ghostPowered) {
      ctx.fill();
    } else {
      ctx.stroke();
    }

    const size = this.network.global.size;
    ctx.fillStyle = "white";
    ctx.fillText(`${size}`, this.x, this.y - 20);
  }
}
