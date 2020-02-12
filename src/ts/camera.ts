import { Drawable } from "./util";

interface Controls {
  up(): void;
  down(): void;
  left(): void;
  right(): void;
}

type Controller = (controls: Controls) => void;
type Context = CanvasRenderingContext2D;

const SPEED = 4;

export class Camera {
  x = 0;
  y = 0;
  width: number;
  height: number;
  controls: Controls;
  controller: Controller;
  ctx: Context;

  constructor(context: Context, controller: Controller) {
    this.ctx = context;
    this.width = context.canvas.width;
    this.height = context.canvas.height;

    const up = () => this.move(0, -SPEED);
    const down = () => this.move(0, SPEED);
    const left = () => this.move(-SPEED, 0);
    const right = () => this.move(SPEED, 0);

    this.controls = { up, down, left, right };
    this.controller = controller;
  }

  inBounds(obj: Drawable) {
    return (
      obj.x + obj.width / 2 >= this.x &&
      obj.x - obj.width / 2 <= this.x + this.width &&
      obj.y + obj.height / 2 >= this.y &&
      obj.y - obj.height / 2 <= this.y + this.height
    );
  }

  move(deltaX: number, deltaY: number) {
    this.x += deltaX;
    this.y += deltaY;
  }

  render(drawables: Drawable[]) {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.translate(-this.x, -this.y);

    for (const drawable of drawables) {
      if (this.inBounds(drawable)) {
        drawable.draw(this.ctx);
      }
    }

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.controller(this.controls);
  }
}
