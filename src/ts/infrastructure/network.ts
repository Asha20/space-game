import { Infrastructure } from "./common";
import * as world from "../environment/world";

export type Network = Set<Infrastructure>;

function distance(obj1: Infrastructure, obj2: Infrastructure) {
  return Math.hypot(obj1.x - obj2.x, obj1.y - obj2.y);
}

export function recalculate(origin: Infrastructure, range: number) {
  const modified = new Set<Infrastructure>();

  for (const other of world.infrastructures) {
    if (other === origin) {
      continue;
    }

    const inRange = distance(origin, other) <= range;

    if (origin.directNetwork.has(other) && !inRange) {
      origin.directNetwork.delete(other);
      other.directNetwork.delete(origin);
      modified.add(other);
    } else if (!origin.directNetwork.has(other) && inRange) {
      origin.directNetwork.add(other);
      other.directNetwork.add(origin);
      modified.add(other);
    }
  }

  rebuildNetwork(origin);
  for (const other of modified) {
    rebuildNetwork(other);
  }
}

function rebuildNetwork(origin: Infrastructure) {
  function _rebuildNetwork(current: Infrastructure, network: Network) {
    if (network.has(current)) {
      return network;
    }

    network.add(current);
    current.network = network;
    for (const other of current.directNetwork) {
      _rebuildNetwork(other, network);
    }
    return network;
  }

  origin.network = _rebuildNetwork(origin, new Set());
}
