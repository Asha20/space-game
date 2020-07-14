import type {
  Miner,
  PowerNode,
  PowerCell,
  Infrastructure,
  Turret,
} from "@/infrastructure";
import type { Asteroid } from "@/environment";
import type { Enemy, Ship } from "@/enemy";
import { Projectile, RedBullet } from "@/projectile";
import type {
  Drawable,
  Collidable,
  Tickable,
  Updatable,
  Ghostable,
  Selectable,
  Destroyable,
  Networkable,
  Attacking,
} from "./traits";

function isInstanceOf<T extends object>(name: string) {
  return function _isInstanceOf(x: object): x is T {
    return x.constructor.name === name;
  };
}

// Traits
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

export function attacking(x: object): x is Attacking {
  const attack = (x as any).attack;
  // The Projectile property isn't checked because I'm not sure
  // what would be a good way to do it.
  return (
    typeof attack === "object" &&
    typeof attack.range === "number" &&
    typeof attack.rate === "number"
  );
}

// Infrastructure
export const miner = isInstanceOf<Miner>("Miner");
export const powerNode = isInstanceOf<PowerNode>("PowerNode");
export const powerCell = isInstanceOf<PowerCell>("PowerCell");
export const turret = isInstanceOf<Turret>("Turret");
export const asteroid = isInstanceOf<Asteroid>("Asteroid");

export function infrastructure(x: object): x is Infrastructure {
  return miner(x) || powerNode(x) || powerCell(x) || turret(x);
}

// Enemies
export const ship = isInstanceOf<Ship>("Ship");

export function enemy(x: object): x is Enemy {
  return ship(x);
}

// Projectiles
export const redBullet = isInstanceOf<RedBullet>("RedBullet");

export function projectile(x: object): x is Projectile {
  return redBullet(x);
}
