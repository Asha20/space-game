import {
  Drawable,
  Updatable,
  Networkable,
  Destroyable,
  Selectable,
  staticImplements,
  Buildable,
} from "../util";
import { rgby } from "../environment/world";
import { Network } from "./network";

let RANGE = 150;

staticImplements<Buildable, typeof PowerNode>();
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

  static cost = rgby(2);
  static description = "Used to form networks to transfer power.";
  static display = new PowerNode(0, 0);

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  update() {}

  destroy() {}

  draw(ctx: CanvasRenderingContext2D) {
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
