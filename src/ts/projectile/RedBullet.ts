import { shape } from "@/util";
import { Projectile } from "./Projectile";

export class RedBullet extends Projectile {
  shape = shape.circle(2);
  speed = 2;
  damage = 5;

  onCollision() {
    this.destroy();
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.shape.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
