import { Asteroid } from "./asteroid";
import * as random from "../random";
import { Drawable, Tickable } from "../util";
import { Miner } from "../infrastructure/miner";

interface Collection<T> {
  set: Set<T>;
  test: (x: unknown) => x is T;
}

const width = 1000;
const height = 1000;

function generateAsteroids(amount: number) {
  const asteroids = [];
  for (let i = 0; i < amount; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);
    const mass = random.range(100, 300);
    const asteroid = new Asteroid(x, y, mass);
    asteroids.push(asteroid);
  }
  return asteroids;
}

function tick() {
  for (const tickable of tickables) {
    tickable.tick();
  }
}

function isMiner(x: unknown): x is Miner {
  return typeof x === "object" && !!x && x.constructor.name === "Miner";
}

function isAsteroid(x: unknown): x is Asteroid {
  return typeof x === "object" && !!x && x.constructor.name === "Asteroid";
}

function isDrawable(x: unknown): x is Drawable {
  return typeof x === "object" && !!x && typeof (x as any).draw === "function";
}

function isTickable(x: unknown): x is Tickable {
  return typeof x === "object" && !!x && typeof (x as any).tick === "function";
}

setInterval(tick, 100);

function collection<T>(test: (x: unknown) => x is T): Collection<T> {
  return { set: new Set<T>(), test };
}

const collections: Record<string, Collection<any>> = {
  miner: collection(isMiner),
  asteroid: collection(isAsteroid),
  drawable: collection(isDrawable),
  tickable: collection(isTickable),
};

export function register(x: unknown) {
  for (const { set, test } of Object.values(collections)) {
    if (test(x)) {
      set.add(x);
    }
  }
}

export function destroy(x: unknown) {
  for (const { set, test } of Object.values(collections)) {
    if (test(x)) {
      set.delete(x);
    }
  }
}

export const miners = collections.miner.set;
export const asteroids = collections.asteroid.set;
export const drawables = collections.drawable.set;
export const tickables = collections.tickable.set;

for (const asteroid of generateAsteroids(30)) {
  register(asteroid);
}
