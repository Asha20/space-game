import { staticImplements, Buildable } from "../util";
import { rgby } from "../environment/world";
import { Infrastructure } from "./Infrastructure";
import { Network } from "./network";

staticImplements<Buildable, typeof PowerNode>();
export class PowerNode extends Infrastructure {
  network: Network = new Network(this);
  radius = 4;
  width = this.radius * 2;
  height = this.radius * 2;
  maxHealth = 20;
  health = this.maxHealth;

  static cost = rgby(2);
  static description = "Used to form networks to transfer power.";
  static display = new PowerNode(0, 0);

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
    ctx.fillStyle = ctx.strokeStyle = this.network.ghostPowered
      ? "white"
      : "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
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
