import { Drawable, Tickable, Networkable, Destroyable } from "../util";
import { Asteroid } from "../environment/asteroid";
import * as world from "../environment/world";
import { Network } from "./network";

const RANGE = 150;

export class Miner implements Drawable, Tickable, Networkable, Destroyable {
  x: number;
  y: number;
  network = new Network(this);
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
    ctx.strokeStyle = ctx.fillStyle = this.network.powered ? "white" : "red";

    for (const target of this.network.local) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(target.x, target.y);
      ctx.stroke();
    }

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
  }
}
