import { Network } from "./infrastructure/index";
import { RGBY } from "./environment/world";

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
  artificial: boolean;
  destroy(): void;
}

export interface Networkable {
  network: Network;
}

export interface Selectable extends Drawable, Ghostable {
  selected: boolean;
}

export interface Vector {
  x: number;
  y: number;
}

export interface Buildable {
  cost: RGBY;
  description: string;
  display: Drawable;
}

export interface Constructor<T> {
  new (...args: any[]): T;
}

export function distance(obj1: Vector, obj2: Vector) {
  return Math.hypot(obj1.x - obj2.x, obj1.y - obj2.y);
}

export function staticImplements<T, U extends T>() {}
