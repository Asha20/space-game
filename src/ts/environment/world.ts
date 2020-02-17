import { Asteroid, AsteroidType } from "./asteroid";
import * as random from "../random";
import * as is from "../is";

interface Collection<T extends object> {
  set: Set<T>;
  test: (x: object) => x is T;
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
    if (!tickable.ghost) {
      tickable.tick();
    }
  }
}

setInterval(tick, 100);

export function register(x: object) {
  for (const { set, test } of collections) {
    if (test(x)) {
      set.add(x);
    }
  }
}

export function destroy(x: object) {
  for (const { set, test } of collections) {
    if (test(x)) {
      set.delete(x);
    }
  }
}

export function update() {
  for (const updatable of updatables) {
    if (updatable.ghost) {
      updatable.update();
    }
  }
}

function collection<T extends object>(test: (x: object) => x is T) {
  const collection: Collection<T> = { set: new Set(), test };
  collections.push(collection);
  return collection.set;
}

const collections: Collection<any>[] = [];

export const miners = collection(is.miner);
export const asteroids = collection(is.asteroid);
export const infrastructures = collection(is.infrastructure);
export const powerNodes = collection(is.powerNode);
export const drawables = collection(is.drawable);
export const updatables = collection(is.updatable);
export const tickables = collection(is.tickable);

export const materials: Record<AsteroidType, number> = {
  redonium: 0,
  greenorium: 0,
  blutonium: 0,
  yellorium: 0,
};

for (const asteroid of generateAsteroids(30)) {
  register(asteroid);
}
