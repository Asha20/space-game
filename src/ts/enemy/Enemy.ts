import { angle, Shape } from "../util";
import { Drawable, Updatable, Tickable } from "../traits";
import { Infrastructure } from "../infrastructure/index";

export abstract class Enemy implements Drawable, Updatable, Tickable {
  x: number;
  y: number;
  rotation = 0;
  ghost = false;
  target: Infrastructure | undefined = undefined;
  abstract speed: number;
  abstract shape: Shape;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  abstract getTarget(): Infrastructure | undefined;
  abstract inRange(target: Infrastructure): boolean;

  tick() {
    if (!this.target || !this.inRange(this.target)) {
      return;
    }

    this.shoot(this.target);
  }

  update() {
    if (!this.target) {
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

  abstract shoot(target: Infrastructure): void;
  abstract draw(ctx: CanvasRenderingContext2D): void;
}
