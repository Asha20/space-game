import { Tickable, distance, shape, health } from "../util";
import { powerNode as isPowerNode } from "../is";
import { Infrastructure } from "./Infrastructure";
import { Asteroid } from "../environment/asteroid";
import * as world from "../environment/world";
import * as Network from "./network";

const RANGE = 150;

const STATIC = Object.freeze({
  cost: world.rgby(10),
  description: "Mines nearby asteroids.",
});

export class Miner extends Infrastructure implements Tickable {
  static = STATIC;
  network = Network.create(this, isPowerNode);
  shape = shape.circle(16);
  health = health(100);
  targets: Asteroid[] = [];

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
    this.targets = [...world.asteroids].filter(
      as => distance(this, as) <= RANGE,
    );
  }

  update() {
    super.update();
    this.recalculateTargets();
  }

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
    ctx.strokeStyle = "white";
    for (const target of this.targets) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(target.x, target.y);
      ctx.stroke();
    }

    ctx.fillStyle = "purple";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.shape.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
