import { Enemy } from "./Enemy";
import * as world from "../environment/world";
import { distance, compare } from "../util";
import { Infrastructure } from "../infrastructure/index";
import { RedBullet } from "../projectile/index";

export class Ship extends Enemy {
  speed = 4;
  radius = 16;
  width = this.radius * 2;
  height = this.radius * 2;
  BulletType = RedBullet;

  constructor(x: number, y: number) {
    super(x, y);
  }

  getTarget() {
    const distanceAscending = [...world.infrastructures].sort(
      compare(inf => distance(this, inf)),
    );
    for (const infrastructure of distanceAscending) {
      if (!infrastructure.ghost) {
        return infrastructure;
      }
    }
  }

  inRange(target: Infrastructure) {
    return distance(this, target) < 100;
  }

  shoot(target: Infrastructure) {
    const bullet = new this.BulletType(this.x, this.y, this, target);
    world.register(bullet);
  }

  update() {
    super.update();
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.fillStyle = "cyan";
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(this.radius, 0);
    ctx.stroke();
    ctx.restore();
  }
}
