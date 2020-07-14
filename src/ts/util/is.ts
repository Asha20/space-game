import type {
  Miner,
  PowerNode,
  PowerCell,
  Infrastructure,
} from "@/infrastructure";
import type { Asteroid } from "@/environment";
import type { Enemy } from "@/enemy";
import type { Projectile } from "@/projectile";
import type {
  Drawable,
  Collidable,
  Tickable,
  Updatable,
  Ghostable,
  Selectable,
  Destroyable,
  Networkable,
} from "./traits";

export function miner(x: object): x is Miner {
  return x.constructor.name === "Miner";
}

export function powerNode(x: object): x is PowerNode {
  return x.constructor.name === "PowerNode";
}

export function powerCell(x: object): x is PowerCell {
  return x.constructor.name === "PowerCell";
}

export function infrastructure(x: object): x is Infrastructure {
  return miner(x) || powerNode(x) || powerCell(x);
}

export function asteroid(x: object): x is Asteroid {
  return x.constructor.name === "Asteroid";
}

export function drawable(x: object): x is Drawable {
  return typeof (x as any).draw === "function";
}

export function collidable(x: object): x is Collidable {
  return typeof (x as any).solid === "boolean";
}

export function ghostable(x: object): x is Ghostable {
  return typeof (x as any).ghost === "boolean";
}

export function updatable(x: object): x is Updatable {
  return ghostable(x) && typeof (x as any).update === "function";
}

export function tickable(x: object): x is Tickable {
  return ghostable(x) && typeof (x as any).tick === "function";
}

export function selectable(x: object): x is Selectable {
  return drawable(x) && typeof (x as any).selected === "boolean";
}

export function destroyable(x: object): x is Destroyable {
  return (
    typeof (x as any).artificial === "boolean" &&
    typeof (x as any).destroy === "function"
  );
}

export function networkable(x: object): x is Networkable {
  return (
    (x as any).network && (x as any).network.constructor.name === "Network"
  );
}

export function enemy(obj: object): obj is Enemy {
  return obj.constructor.name === "Enemy";
}

export function projectile(obj: object): obj is Projectile {
  return obj.constructor.name === "Projectile";
}
