import { Drawable, Networkable, Destroyable, Selectable } from "../util";
import { Network } from "./network";
import * as world from "../environment/world";

const RANGE = 150;

export abstract class Infrastructure
  implements Drawable, Networkable, Destroyable, Selectable {
  x: number;
  y: number;
  artificial = true;
  ghost = false;
  selected = false;
  abstract network: Network;
  abstract radius: number;
  abstract width: number;
  abstract height: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  update() {
    this.network.recalculate(RANGE);
  }

  destroy() {
    world.destroy(this);
    this.network.recalculate(0);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = "white";
    Network.render(ctx, this);

    if (this.selected) {
      ctx.strokeStyle = "lime";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius + 5, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}
