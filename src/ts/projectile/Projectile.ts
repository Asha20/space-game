import { Infrastructure } from "../infrastructure/index";
import { Updatable, Drawable, angle, distance, Destroyable } from "../util";
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
  abstract width: number;
  abstract height: number;

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

    if (distance(this, this.target) <= this.target.radius) {
      this.onCollision(this.target);
      this.target.health -= this.damage;
      if (this.target.health <= 0) {
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
