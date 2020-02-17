import { Asteroid, AsteroidType } from "./asteroid";
import * as random from "../random";
import { Drawable, Tickable, Updatable } from "../util";
import { Miner, PowerNode, PowerCell } from "../infrastructure/index";

type Infrastructure = Miner | PowerNode;

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

function isPowerNode(x: unknown): x is PowerNode {
  return typeof x === "object" && !!x && x.constructor.name === "PowerNode";
}

function isPowerCell(x: unknown): x is PowerCell {
  return typeof x === "object" && !!x && x.constructor.name === "PowerCell";
}

function isInfrastructure(x: unknown): x is Infrastructure {
  return isMiner(x) || isPowerNode(x) || isPowerCell(x);
}

function isAsteroid(x: unknown): x is Asteroid {
  return typeof x === "object" && !!x && x.constructor.name === "Asteroid";
}

function isDrawable(x: unknown): x is Drawable {
  return typeof x === "object" && !!x && typeof (x as any).draw === "function";
}

function isUpdatable(x: unknown): x is Updatable {
  return (
    typeof x === "object" && !!x && typeof (x as any).update === "function"
  );
}

function isTickable(x: unknown): x is Tickable {
  return typeof x === "object" && !!x && typeof (x as any).tick === "function";
}

setInterval(tick, 100);

export function register(x: unknown) {
  for (const { set, test } of collections) {
    if (test(x)) {
      set.add(x);
    }
  }
}

export function destroy(x: unknown) {
  for (const { set, test } of collections) {
    if (test(x)) {
      set.delete(x);
    }
  }
}

export function update() {
  for (const updatable of updatables) {
    if ((updatable as any).__ghost) {
      updatable.update();
    }
  }
}

function collection<T>(test: (x: unknown) => x is T) {
  const collection: Collection<T> = { set: new Set(), test };
  collections.push(collection);
  return collection.set;
}

const collections: Collection<any>[] = [];

export const miners = collection(isMiner);
export const asteroids = collection(isAsteroid);
export const infrastructures = collection(isInfrastructure);
export const powerNodes = collection(isPowerNode);
export const drawables = collection(isDrawable);
export const updatables = collection(isUpdatable);
export const tickables = collection(isTickable);

export const materials: Record<AsteroidType, number> = {
  redonium: 0,
  greenorium: 0,
  blutonium: 0,
  yellorium: 0,
};

for (const asteroid of generateAsteroids(30)) {
  register(asteroid);
}
