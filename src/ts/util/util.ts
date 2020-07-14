import { Drawable, Collidable } from "./traits";
import { ProjectileConstructor } from "@/projectile/Projectile";

export interface Shape {
  radius: number;
  width: number;
  height: number;
}

export interface Health {
  max: number;
  current: number;
}

export interface Attack {
  Projectile: ProjectileConstructor;
  range: number;
  rate: number;
}

export const shape = {
  circle(radius: number): Shape {
    return { radius, width: 2 * radius, height: 2 * radius };
  },
};

export function health(max: number): Health {
  return { max, current: max };
}

export interface Vector {
  x: number;
  y: number;
}

export function distance(obj1: Vector, obj2: Vector) {
  return Math.hypot(obj1.x - obj2.x, obj1.y - obj2.y);
}

export function compare<T>(transform: (x: T) => number, reverse = false) {
  return (a: T, b: T) => {
    return reverse ? transform(b) - transform(a) : transform(a) - transform(b);
  };
}

export function angle(origin: Vector, target: Vector) {
  return Math.atan2(target.y - origin.y, target.x - origin.x);
}

export interface RGBY<T = number> {
  redonium: T;
  greenorium: T;
  blutonium: T;
  yellorium: T;
}

export function rgby1<T>(amount: T): RGBY<T> {
  return rgby4(amount, amount, amount, amount);
}
export function rgby4<T>(
  redonium: T,
  greenorium: T,
  blutonium: T,
  yellorium: T,
): RGBY<T> {
  return { redonium, greenorium, blutonium, yellorium };
}

export function isInside(obj: Drawable, x: number, y: number) {
  return (
    x >= obj.x - obj.shape.radius &&
    x <= obj.x + obj.shape.radius &&
    y >= obj.y - obj.shape.radius &&
    y <= obj.y + obj.shape.radius
  );
}

export function areColliding(a: Collidable, b: Collidable) {
  const dist = Math.hypot(a.x - b.x, a.y - b.y);
  return dist < a.shape.radius + b.shape.radius;
}
