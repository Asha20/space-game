import { Network } from "@/infrastructure";
import { RGBY } from "./util";
import { ProjectileConstructor } from "@/projectile/Projectile";

export interface Shape {
  radius: number;
  width: number;
  height: number;
}

export interface Drawable {
  x: number;
  y: number;
  shape: Shape;
  draw(ctx: CanvasRenderingContext2D): void;
}

export interface Collidable extends Drawable {
  solid: boolean;
}

export interface Ghostable {
  ghost: boolean;
}

export interface Updatable extends Ghostable {
  update(): void;
}

export interface Tickable extends Ghostable {
  tick(id: number): void;
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

export interface Build {
  cost: RGBY;
  description: string;
}

export interface Buildable {
  build: Build;
}

export interface Health {
  max: number;
  current: number;
}

export interface Damageable {
  health: Health;
}

export interface Attack {
  Projectile: ProjectileConstructor;
  range: number;
  rate: number;
}

export interface Attacking {
  attack: Attack;
}

export interface Static<T> {
  static: T;
}

export const shape = {
  circle(radius: number): Shape {
    return Object.freeze({ radius, width: 2 * radius, height: 2 * radius });
  },
};

export function health(max: number, current?: number): Health {
  return { max, current: current ?? max };
}

export function attack(
  Projectile: ProjectileConstructor,
  rate: number,
  range: number,
): Attack {
  return Object.freeze({ Projectile, rate, range });
}

export function build(cost: RGBY<number>, description: string): Build {
  return { cost, description };
}
