import { is, areColliding, isInside, Collidable } from "@/util";

interface Collection<T extends object> {
  set: Set<T>;
  test: (x: object) => x is T;
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
export const collidables = collection(is.collidable);
export const enemies = collection(is.enemy);

export function checkCollision(obj: Collidable) {
  for (const other of collidables) {
    if (obj === other || (is.ghostable(other) && other.ghost)) {
      continue;
    }

    if (areColliding(obj, other)) {
      return true;
    }
  }

  return false;
}

export function register(obj: object) {
  if (is.collidable(obj) && checkCollision(obj)) {
    return false;
  }

  for (const { set, test } of collections) {
    if (test(obj)) {
      set.add(obj);
    }
  }

  if (is.updatable(obj)) {
    obj.update();
  }

  return true;
}

export function destroy(x: object) {
  for (const { set, test } of collections) {
    if (test(x)) {
      set.delete(x);
    }
  }
}

let tickId = 0;
export function tick() {
  for (const tickable of tickables) {
    if (!tickable.ghost) {
      tickable.tick(tickId);
    }
  }

  tickId += 1;
}

export function update() {
  for (const updatable of updatables) {
    if (
      updatable.ghost ||
      is.projectile(updatable) ||
      is.attacking(updatable)
    ) {
      updatable.update();
    }
  }
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
