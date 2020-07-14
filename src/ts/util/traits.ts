import { Network } from "../infrastructure";
import { RGBY } from "../environment/world";
import { Shape, Health } from "./util";

export interface Drawable {
  x: number;
  y: number;
  shape: Shape;
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
  artificial: boolean;
  destroy(): void;
}

export interface Networkable {
  network: Network.Network;
}

export interface Selectable extends Drawable, Ghostable {
  selected: boolean;
}

export interface Buildable {
  cost: RGBY;
  description: string;
}

export interface Damageable {
  health: Health;
}

export interface Static<T> {
  static: T;
}
