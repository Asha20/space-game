import {
  Drawable,
  Networkable,
  Destroyable,
  Selectable,
  Damageable,
  Shape,
  Buildable,
  Static,
  Health,
} from "../util";
import * as Network from "./network";
import * as world from "../environment/world";

const RANGE = 150;

export abstract class Infrastructure
  implements
    Static<Buildable>,
    Drawable,
    Networkable,
    Destroyable,
    Selectable,
    Damageable {
  x: number;
  y: number;
  artificial = true;
  ghost = false;
  selected = false;
  abstract static: Buildable;
  abstract health: Health;
  abstract network: Network.Network;
  abstract shape: Shape;

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
      ctx.arc(this.x, this.y, this.shape.radius + 5, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}
