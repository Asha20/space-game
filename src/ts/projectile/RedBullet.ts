import { Projectile } from "./Projectile";
import { shape } from "@/util/util";

export class RedBullet extends Projectile {
  shape = shape.circle(2);
  speed = 4;
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
