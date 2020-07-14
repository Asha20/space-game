export interface Shape {
  radius: number;
  width: number;
  height: number;
}

export interface Health {
  max: number;
  current: number;
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
