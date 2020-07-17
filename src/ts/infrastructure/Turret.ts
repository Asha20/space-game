import {
  rgby1,
  distance,
  shape,
  health,
  is,
  compare,
  Attack,
  build,
} from "@/util";
import { Asteroid, collections } from "@/environment";
import { RedBullet } from "@/projectile";
import * as Network from "./network";
import { AttackInfrastructure } from "./AttackInfrastructure";

const COST = rgby1(10);
const DESCRIPTION = "Attacks enemies.";

const ATTACK: Attack = Object.freeze({
  Projectile: RedBullet,
  range: 200,
  rate: 5,
});

export class Turret extends AttackInfrastructure {
  build = build(COST, DESCRIPTION);
  network = Network.create(this, is.powerNode);
  shape = shape.circle(16);
  health = health(100);
  attack = ATTACK;
  targets: Asteroid[] = [];

  getTarget() {
    const enemiesByDistance = [...collections.enemies].sort(
      compare(inf => distance(this, inf)),
    );
    return enemiesByDistance[0];
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

    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.shape.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
