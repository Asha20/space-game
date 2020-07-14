import { Infrastructure } from "../infrastructure/index";
import {
  Updatable,
  Drawable,
  angle,
  distance,
  Destroyable,
  Shape,
} from "../util";
import * as world from "../environment/world";
import { Enemy } from "../enemy/index";

export abstract class Projectile implements Updatable, Drawable, Destroyable {
  x: number;
  y: number;
  shooter: Enemy;
  target: Infrastructure;
  rotation = 0;
  ghost = false;
  artificial = false;
  abstract speed: number;
  abstract damage: number;
  abstract shape: Shape;

  constructor(x: number, y: number, shooter: Enemy, target: Infrastructure) {
    this.x = x;
    this.y = y;
    this.shooter = shooter;
    this.target = target;
  }

  abstract onCollision(target: Infrastructure): void;

  update() {
    this.rotation = angle(this, this.target);

    this.x += this.speed * Math.cos(this.rotation);
    this.y += this.speed * Math.sin(this.rotation);

    if (distance(this, this.target) <= this.target.shape.radius) {
      this.onCollision(this.target);
      this.target.health.current -= this.damage;
      if (this.target.health.current <= 0) {
        this.target.destroy();
        this.shooter.target = this.shooter.getTarget();
      }
    }
  }

  destroy() {
    world.destroy(this);
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
}
