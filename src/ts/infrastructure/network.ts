import { Infrastructure } from "./common";
import * as world from "../environment/world";
import { PowerNode } from "./PowerNode";
import { PowerCell } from "./PowerCell";

export class Network {
  // nodes = new Set<PowerNode>();
  // cells = new Set<PowerCell>();
  global = new Set<Infrastructure>();
  local = new Set<Infrastructure>();
  origin: Infrastructure;

  constructor(origin: Infrastructure) {
    this.origin = origin;
  }

  get powered(): boolean {
    return [...this.global].some(x => x.constructor.name === "PowerCell");
  }

  recalculate(range: number) {
    const origin = this.origin;
    const modified = new Set<Infrastructure>([origin]);

    for (const other of world.infrastructures) {
      if (other === origin) {
        continue;
      }

      const inRange = distance(origin, other) <= range;

      if (this.local.has(other) && !inRange) {
        this.local.delete(other);
        other.network.local.delete(origin);
        modified.add(other);
      } else if (!this.local.has(other) && inRange) {
        this.local.add(other);
        other.network.local.add(origin);
        modified.add(other);
      }
    }

    for (const structure of modified) {
      structure.network.reform();
    }
  }

  reform() {
    function _reform(current: Infrastructure, network: Set<Infrastructure>) {
      if (network.has(current)) {
        return network;
      }

      network.add(current);
      current.network.global = network;
      for (const other of current.network.local) {
        _reform(other, network);
      }
      return network;
    }

    this.global = _reform(this.origin, new Set());
  }
}

function distance(obj1: Infrastructure, obj2: Infrastructure) {
  return Math.hypot(obj1.x - obj2.x, obj1.y - obj2.y);
}

// export function recalculate(origin: Infrastructure, range: number) {
//   const modified = new Set<Infrastructure>([origin]);

//   for (const other of world.infrastructures) {
//     if (other === origin) {
//       continue;
//     }

//     const inRange = distance(origin, other) <= range;

//     if (origin.directNetwork.has(other) && !inRange) {
//       origin.directNetwork.delete(other);
//       other.directNetwork.delete(origin);
//       modified.add(other);
//     } else if (!origin.directNetwork.has(other) && inRange) {
//       origin.directNetwork.add(other);
//       other.directNetwork.add(origin);
//       modified.add(other);
//     }
//   }

//   for (const structure of modified) {
//     rebuildNetwork(structure);
//   }
// }

// function rebuildNetwork(origin: Infrastructure) {
//   function _rebuildNetwork(
//     current: Infrastructure,
//     network: Set<Infrastructure>,
//   ) {
//     if (network.has(current)) {
//       return network;
//     }

//     network.add(current);
//     current.network = network;
//     for (const other of current.directNetwork) {
//       _rebuildNetwork(other, network);
//     }
//     return network;
//   }

//   origin.network = _rebuildNetwork(origin, new Set());
// }
