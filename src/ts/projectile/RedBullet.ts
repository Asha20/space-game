import { Projectile } from "./Projectile";
import { Infrastructure } from "../infrastructure/index";

export class RedBullet extends Projectile {
  radius = 2;
  width = this.radius * 2;
  height = this.radius * 2;
  speed = 4;
  damage = 5;

  onCollision(target: Infrastructure) {
    this.destroy();
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
