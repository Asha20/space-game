import { Infrastructure } from "../infrastructure/index";
import { Updatable, Drawable, angle, distance, Destroyable } from "../util";
import * as world from "../environment/world";

export abstract class Projectile implements Updatable, Drawable, Destroyable {
  x: number;
  y: number;
  target: Infrastructure;
  rotation = 0;
  ghost = false;
  artificial = false;
  abstract speed: number;
  abstract width: number;
  abstract height: number;

  constructor(x: number, y: number, target: Infrastructure) {
    this.x = x;
    this.y = y;
    this.target = target;
  }

  abstract onCollision(target: Infrastructure): void;

  update() {
    this.rotation = angle(this, this.target);

    this.x += this.speed * Math.cos(this.rotation);
    this.y += this.speed * Math.sin(this.rotation);

    if (distance(this, this.target) <= this.target.radius) {
      this.onCollision(this.target);
    }
  }

  destroy() {
    world.destroy(this);
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
}
