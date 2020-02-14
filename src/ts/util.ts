export interface Drawable {
  x: number;
  y: number;
  width: number;
  height: number;
  draw(ctx: CanvasRenderingContext2D): void;
}

export interface Vector {
  x: number;
  y: number;
}
