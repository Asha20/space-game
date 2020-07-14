import { distance, compare, shape, health, Attack } from "@/util";
import { RedBullet } from "@/projectile";
import { collections } from "@/environment";
import { Enemy } from "./Enemy";

const ATTACK: Attack = Object.freeze({
  Projectile: RedBullet,
  rate: 2,
  range: 100,
});

export class Ship extends Enemy {
  speed = 4;
  shape = shape.circle(16);
  health = health(20);
  attack = ATTACK;

  getTarget() {
    return [...collections.infrastructures]
      .sort(compare(inf => distance(this, inf)))
      .find(infrastructure => !infrastructure.ghost);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.fillStyle = "cyan";
    ctx.beginPath();
    ctx.arc(0, 0, this.shape.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(this.shape.radius, 0);
    ctx.stroke();
    ctx.restore();
  }
}
