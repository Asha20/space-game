import {
  Drawable,
  Tickable,
  Networkable,
  Destroyable,
  Selectable,
} from "../util";
import { Asteroid } from "../environment/asteroid";
import * as world from "../environment/world";
import { Network } from "./network";
import { powerNode as isPowerNode } from "../is";

const RANGE = 150;

export class Miner
  implements Drawable, Tickable, Networkable, Destroyable, Selectable {
  x: number;
  y: number;
  artificial = true;
  ghost = false;
  selected = false;
  network: Network = new Network(this, isPowerNode);
  radius: number = 16;
  width: number = this.radius * 2;
  height: number = this.radius * 2;
  targets: Asteroid[] = [];

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.update();
  }

  tick() {
    if (!this.network.powered) {
      return;
    }

    for (const target of this.targets) {
      if (target.mass > 0) {
        target.mass -= 1;
        world.materials[target.kind.type] += 1;
      } else {
        this.recalculateTargets();
      }
    }
  }

  recalculateTargets() {
    this.targets = [...world.asteroids].filter(as => {
      return Math.hypot(as.x - this.x, as.y - this.y) <= RANGE;
    });
  }

  update() {
    this.recalculateTargets();
    this.network.recalculate(RANGE);
  }

  destroy() {
    world.destroy(this);
    this.network.recalculate(0);
  }

  draw(ctx: CanvasRenderingContext2D) {
    Network.render(ctx, this);

    ctx.strokeStyle = "white";
    for (const target of this.targets) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(target.x, target.y);
      ctx.stroke();
    }

    ctx.fillStyle = "purple";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    if (this.selected) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius + 5, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}
