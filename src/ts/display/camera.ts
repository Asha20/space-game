import { Drawable } from "../util/traits";
import { Mouse } from "./input";

interface Controls {
  up(): void;
  down(): void;
  left(): void;
  right(): void;
  zoomIn(): void;
  zoomOut(): void;
}

type Controller = (controls: Controls) => void;
type Context = CanvasRenderingContext2D;

const SPEED = 4;

export class Camera {
  x = 0;
  y = 0;
  zoom = 1;
  controls: Controls;
  controller: Controller;
  canvasWidth: number;
  canvasHeight: number;
  ctx: Context;
  mouse: Mouse;

  constructor(context: Context, controller: Controller) {
    this.ctx = context;
    this.canvasWidth = context.canvas.width;
    this.canvasHeight = context.canvas.height;
    this.mouse = new Mouse(this.ctx.canvas, ({ x, y }) => {
      return {
        x: x / this.zoom + this.x - this.width / 2,
        y: y / this.zoom + this.y - this.height / 2,
      };
    });
    const up = () => this.move(0, -SPEED);
    const down = () => this.move(0, SPEED);
    const left = () => this.move(-SPEED, 0);
    const right = () => this.move(SPEED, 0);
    const zoomIn = () => this.addZoom(2);
    const zoomOut = () => this.addZoom(0.5);

    this.controls = { up, down, left, right, zoomIn, zoomOut };
    this.controller = controller;
  }

  get width() {
    return this.canvasWidth / this.zoom;
  }

  get height() {
    return this.canvasHeight / this.zoom;
  }

  inBounds(obj: Drawable) {
    const { width, height } = obj.shape;
    return (
      obj.x + width / 2 >= this.x - this.width / 2 &&
      obj.x - width / 2 <= this.x + this.width / 2 &&
      obj.y + height / 2 >= this.y - this.height / 2 &&
      obj.y - height / 2 <= this.y + this.height / 2
    );
  }

  move(deltaX: number, deltaY: number) {
    this.x += deltaX;
    this.y += deltaY;
    this.mouse.recalculate();
  }

  addZoom(delta: number) {
    const newZoom = this.zoom * delta;
    if (newZoom >= 0.25 && newZoom <= 4) {
      this.zoom = newZoom;
    }
    this.mouse.recalculate();
  }

  render(drawables: Iterable<Drawable>) {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.ctx.scale(this.zoom, this.zoom);
    this.ctx.translate(this.width / 2 - this.x, this.height / 2 - this.y);

    for (const drawable of drawables) {
      if (this.inBounds(drawable)) {
        drawable.draw(this.ctx);
      }
    }

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.controller(this.controls);
  }
}
