import { collections } from "@/environment";
import {
  Shape,
  Health,
  Drawable,
  Networkable,
  Destroyable,
  Selectable,
  Damageable,
  Buildable,
  Static,
  Collidable,
} from "@/util";
import * as Network from "./network";

const RANGE = 150;

export abstract class Infrastructure
  implements
    Static<Buildable>,
    Drawable,
    Networkable,
    Destroyable,
    Selectable,
    Damageable,
    Collidable {
  x: number;
  y: number;
  artificial = true;
  ghost = false;
  selected = false;
  solid = true;
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
    collections.destroy(this);
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
