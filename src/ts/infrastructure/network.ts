import { Infrastructure } from "./common";
import * as world from "../environment/world";

const connectAlways = () => true;

function distance(obj1: Infrastructure, obj2: Infrastructure) {
  return Math.hypot(obj1.x - obj2.x, obj1.y - obj2.y);
}

export class Network {
  global = new Set<Infrastructure>();
  local = new Set<Infrastructure>();
  origin: Infrastructure;
  canConnect: (other: Infrastructure) => boolean;

  constructor(
    origin: Infrastructure,
    canConnect: (other: Infrastructure) => boolean = connectAlways,
  ) {
    this.origin = origin;
    this.canConnect = canConnect;
  }

  static render(ctx: CanvasRenderingContext2D, origin: Infrastructure) {
    ctx.strokeStyle = origin.network.powered ? "white" : "red";
    for (const target of origin.network.local) {
      ctx.beginPath();
      ctx.moveTo(origin.x, origin.y);
      ctx.lineTo(target.x, target.y);
      ctx.stroke();
    }
  }

  get powered(): boolean {
    return [...this.global].some(x => x.constructor.name === "PowerCell");
  }

  recalculate(range: number) {
    const origin = this.origin;
    const modified = new Set<Infrastructure>([origin]);

    for (const other of world.infrastructures) {
      if (other === origin || !this.canConnect(other)) {
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
