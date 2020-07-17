import { rgby1, distance, shape, health, Tickable, is, build } from "@/util";
import { Asteroid, world, collections } from "@/environment";
import { Infrastructure } from "./Infrastructure";
import * as Network from "./network";

const RANGE = 100;

const COST = rgby1(10);
const DESCRIPTION = "Mines nearby asteroids.";

export class Miner extends Infrastructure implements Tickable {
  build = build(COST, DESCRIPTION);
  network = Network.create(this, is.powerNode);
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
    this.targets = [...collections.asteroids].filter(
      as => distance(this, as) <= RANGE + as.shape.radius,
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
