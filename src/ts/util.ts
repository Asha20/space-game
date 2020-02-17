import { Network } from "./infrastructure/index";

export interface Drawable {
  x: number;
  y: number;
  width: number;
  height: number;
  draw(ctx: CanvasRenderingContext2D): void;
}

export interface Ghostable {
  ghost: boolean;
}

export interface Updatable extends Ghostable {
  update(): void;
}

export interface Tickable extends Ghostable {
  tick(): void;
}

export interface Destroyable {
  destroy(): void;
}

export interface Networkable {
  network: Network;
}

export interface Vector {
  x: number;
  y: number;
}
