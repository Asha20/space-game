import { Tickable, Buildable, staticImplements, distance } from "../util";
import { powerNode as isPowerNode } from "../is";
import { Infrastructure } from "./Infrastructure";
import { Asteroid } from "../environment/asteroid";
import * as world from "../environment/world";
import { Network } from "./network";

const RANGE = 150;

staticImplements<Buildable, typeof Miner>();
export class Miner extends Infrastructure implements Tickable {
  network: Network = new Network(this, isPowerNode);
  radius = 16;
  width = this.radius * 2;
  height = this.radius * 2;
  targets: Asteroid[] = [];

  static cost = world.rgby(10);
  static description = "Mines nearby asteroids.";
  static display = new Miner(0, 0);

  constructor(x: number, y: number) {
    super(x, y);
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
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
