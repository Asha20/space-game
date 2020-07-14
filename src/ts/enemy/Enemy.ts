import {
  angle,
  Shape,
  Drawable,
  Updatable,
  Tickable,
  Damageable,
  Health,
  Destroyable,
  Attacking,
  Attack,
  distance,
} from "@/util";
import { Infrastructure } from "@/infrastructure";
import { collections } from "@/environment";

export abstract class Enemy
  implements Drawable, Updatable, Tickable, Damageable, Destroyable, Attacking {
  x: number;
  y: number;
  rotation = 0;
  ghost = false;
  artificial = false;
  target: Infrastructure | undefined;
  abstract speed: number;
  abstract shape: Shape;
  abstract health: Health;
  abstract attack: Attack;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  abstract getTarget(): Infrastructure | undefined;

  inRange(target: Infrastructure) {
    return distance(this, target) < this.attack.range;
  }

  tick(id: number) {
    if (!this.target || !this.inRange(this.target)) {
      return;
    }

    if (id % this.attack.rate === 0) {
      this.shoot(this.target);
    }
  }

  update() {
    if (!this.target || (this.target && this.target.health.current <= 0)) {
      this.target = this.getTarget();
    }

    if (!this.target) {
      return;
    }

    this.rotation = angle(this, this.target);

    if (this.inRange(this.target)) {
      return;
    }

    this.x += this.speed * Math.cos(this.rotation);
    this.y += this.speed * Math.sin(this.rotation);
  }

  destroy() {
    collections.destroy(this);
  }

  shoot(target: Infrastructure) {
    const projectile = new this.attack.Projectile(this.x, this.y, target);
    collections.register(projectile);
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
}
