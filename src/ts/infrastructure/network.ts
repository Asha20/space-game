import { distance, Networkable, Vector } from "@/util";
import { collections } from "@/environment";
import { Infrastructure } from "./Infrastructure";

const connectAlways = (other: Infrastructure) => true;

export type { Network };

class Network {
  global = new Set<Infrastructure>();
  local = new Set<Infrastructure>();
  origin: Infrastructure;
  canConnect: (other: Infrastructure) => boolean;

  constructor(
    origin: Infrastructure,
    canConnect: (other: Infrastructure) => boolean,
  ) {
    this.origin = origin;
    this.canConnect = canConnect;
  }

  get powered(): boolean {
    return (
      this.search(
        x => x.constructor.name === "PowerCell",
        x => !x.ghost,
      ) !== null
    );
  }

  get ghostPowered(): boolean {
    return this.search(x => x.constructor.name === "PowerCell") !== null;
  }

  search(
    validTarget: (x: Infrastructure) => boolean,
    validPath: (x: Infrastructure) => boolean = () => true,
    includeSelf: boolean = true,
  ): Infrastructure | null {
    const visited = new Set<Infrastructure>();
    const toVisit = [this.origin];

    while (toVisit.length > 0) {
      const current = toVisit.pop()!;

      if ((includeSelf || current !== this.origin) && validTarget(current)) {
        return current;
      }

      if (visited.has(current)) {
        continue;
      }
      visited.add(current);
      for (const local of current.network.local) {
        if (!visited.has(local) && validPath(local)) {
          toVisit.push(local);
        }
      }
    }

    return null;
  }

  recalculate(range: number) {
    const origin = this.origin;
    const modified = new Set<Infrastructure>([origin]);

    for (const other of collections.infrastructures) {
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
    const _reform = (current: Infrastructure, network: Set<Infrastructure>) => {
      if (network.has(current)) {
        return network;
      }

      network.add(current);
      current.network.global = network;
      for (const other of current.network.local) {
        _reform(other, network);
      }
      return network;
    };

    this.global = _reform(this.origin, new Set());
  }
}

export function create(
  origin: Infrastructure,
  canConnect = connectAlways,
): Network {
  return new Network(origin, canConnect);
}

export function render(
  ctx: CanvasRenderingContext2D,
  origin: Vector & Networkable,
) {
  ctx.strokeStyle = origin.network.ghostPowered ? "white" : "red";
  for (const target of origin.network.local) {
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(target.x, target.y);
    ctx.stroke();
  }
}
