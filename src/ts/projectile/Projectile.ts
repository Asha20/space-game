import {
  angle,
  distance,
  Updatable,
  Drawable,
  Destroyable,
  Shape,
  Damageable,
} from "@/util";
import { collections } from "@/environment";

type Target = Damageable & Drawable & Destroyable;

export abstract class Projectile implements Updatable, Drawable, Destroyable {
  x: number;
  y: number;
  target: Target;
  rotation = 0;
  ghost = false;
  artificial = false;
  abstract speed: number;
  abstract damage: number;
  abstract shape: Shape;

  constructor(x: number, y: number, target: Target) {
    this.x = x;
    this.y = y;
    this.target = target;
  }

  abstract onCollision(target: Target): void;

  update() {
    this.rotation = angle(this, this.target);

    this.x += this.speed * Math.cos(this.rotation);
    this.y += this.speed * Math.sin(this.rotation);

    if (distance(this, this.target) <= this.target.shape.radius) {
      this.onCollision(this.target);
      this.target.health.current -= this.damage;
      this.destroy();
      if (this.target.health.current <= 0) {
        this.target.destroy();
      }
    }
  }

  destroy() {
    collections.destroy(this);
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
}

export interface ProjectileConstructor {
  new (x: number, y: number, target: Target): Projectile;
}
