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
  Collidable,
  Updatable,
  Build,
} from "@/util";
import * as Network from "./network";

const RANGE = 150;

export abstract class Infrastructure
  implements
    Buildable,
    Drawable,
    Networkable,
    Destroyable,
    Selectable,
    Damageable,
    Collidable,
    Updatable {
  x: number;
  y: number;
  artificial = true;
  ghost = false;
  selected = false;
  solid = true;
  abstract build: Build;
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

export interface InfrastructureConstructor {
  new (x: number, y: number): Infrastructure;
}
