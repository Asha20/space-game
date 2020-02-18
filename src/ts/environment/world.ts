import { Asteroid, AsteroidType } from "./asteroid";
import * as random from "../random";
import * as is from "../is";
import { Drawable } from "../util";
import { Network } from "../infrastructure/index";

interface Collection<T extends object> {
  set: Set<T>;
  test: (x: object) => x is T;
}

export interface RGBY<T> {
  redonium: T;
  greenorium: T;
  blutonium: T;
  yellorium: T;
}

export function rgby<T>(
  redonium: T,
  greenorium: T,
  blutonium: T,
  yellorium: T,
): RGBY<T> {
  return { redonium, greenorium, blutonium, yellorium };
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

export function register(obj: object) {
  for (const { set, test } of collections) {
    if (test(obj)) {
      set.add(obj);
    }
  }

  if (is.updatable(obj) && is.networkable(obj)) {
    const oldUpdate = obj.update;
    obj.update = function newUpdate() {
      oldUpdate.call(this);
      this.network.recalculate(150);
    };
  }

  if (is.destroyable(obj)) {
    const oldDestroy = obj.destroy;
    obj.destroy = function newDestroy() {
      destroy(this);
      oldDestroy.call(this);

      if (is.networkable(this)) {
        this.network.recalculate(0);
      }
    };
  }

  if (is.drawable(obj)) {
    const oldDraw = obj.draw;
    obj.draw = function newDraw(ctx) {
      oldDraw.call(this, ctx);

      if (is.networkable(this)) {
        ctx.strokeStyle = "white";
        Network.render(ctx, this);
      }
      if (is.selectable(obj) && obj.selected) {
        ctx.strokeStyle = "lime";
        ctx.beginPath();
        ctx.arc(obj.x, obj.y, obj.width / 2 + 5, 0, Math.PI * 2);
        ctx.stroke();
      }
    };
  }

  if (is.updatable(obj)) {
    obj.update();
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

function isInside(obj: Drawable, x: number, y: number) {
  const halfWidth = obj.width / 2;
  const halfHeight = obj.height / 2;
  return (
    x >= obj.x - halfWidth &&
    x <= obj.x + halfWidth &&
    y >= obj.y - halfHeight &&
    y <= obj.y + halfHeight
  );
}

export function select(x: number, y: number) {
  for (const selectable of selectables) {
    if (selectable.ghost) {
      continue;
    }
    selectable.selected = isInside(selectable, x, y);
  }
}

export function deleteSelection() {
  for (const selectable of selectables) {
    if (
      !selectable.selected ||
      selectable.ghost ||
      !is.destroyable(selectable) ||
      !selectable.artificial
    ) {
      continue;
    }

    selectable.destroy();
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
export const selectables = collection(is.selectable);

export const materials: Record<AsteroidType, number> = {
  redonium: 0,
  greenorium: 0,
  blutonium: 0,
  yellorium: 0,
};

for (const asteroid of generateAsteroids(30)) {
  register(asteroid);
}
