import { Infrastructure, Network } from "./infrastructure/index";

export interface Drawable {
  x: number;
  y: number;
  width: number;
  height: number;
  draw(ctx: CanvasRenderingContext2D): void;
}

export interface Updatable {
  update(): void;
}

export interface Tickable {
  tick(): void;
}

export interface Destroyable {
  destroy(): void;
}

export interface Powerable {
  powered: boolean;
  network: Network;
  directNetwork: Network;
}

export interface Vector {
  x: number;
  y: number;
}
