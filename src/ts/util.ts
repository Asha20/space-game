export interface Drawable {
  x: number;
  y: number;
  width: number;
  height: number;
  draw(ctx: CanvasRenderingContext2D): void;
}

export interface Tickable {
  tick(): void;
}

export interface Destroyable {
  destroy(): void;
}

export interface Vector {
  x: number;
  y: number;
}
