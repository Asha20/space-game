import { Drawable, Destroyable, Selectable } from "@/util/traits";
import { Vector } from "@/util/util";
import * as random from "@/util/random";
import * as world from "./world";

export enum AsteroidType {
  Redonium = "redonium",
  Yellorium = "yellorium",
  Blutonium = "blutonium",
  Greenorium = "greenorium",
}

interface AsteroidKind {
  type: AsteroidType;
  color: string;
}

const kinds: AsteroidKind[] = [
  {
    type: AsteroidType.Redonium,
    color: "#ff4c4c",
  },
  {
    type: AsteroidType.Greenorium,
    color: "#3dcd3d",
  },
  {
    type: AsteroidType.Blutonium,
    color: "#2e9c9c",
  },
  {
    type: AsteroidType.Yellorium,
    color: "#ff9d4c",
  },
];

function radians(degrees: number) {
  return (degrees / 180) * Math.PI;
}

export class Asteroid implements Drawable, Destroyable, Selectable {
  x: number;
  y: number;
  ghost = false;
  selected = false;
  artificial = false;
  mass: number;
  kind: AsteroidKind;
  seed: number;

  constructor(x: number, y: number, mass: number) {
    this.x = x;
    this.y = y;
    this.seed = random.getSeed();
    this.mass = mass / 6;
    this.kind = random.choose(kinds);
  }

  get shape() {
    return {
      radius: this.mass,
      width: this.mass * 2,
      height: this.mass * 2,
    };
  }

  static shouldSpawn() {
    return random.dice(15);
  }

  destroy() {
    world.destroy(this);
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.mass <= 0) {
      this.destroy();
    }

    random.setSeed(this.seed);
    ctx.fillStyle = this.kind.color;

    const vertices = 10;
    let angle = 0;

    const points: Vector[] = [];
    for (let i = 0; i < vertices; i++) {
      const point: Vector = {
        x:
          this.x +
          Math.cos(angle) * random.rangeFloat(0.6, 1) * this.shape.radius,
        y:
          this.y +
          Math.sin(angle) * random.rangeFloat(0.6, 1) * this.shape.radius,
      };
      angle += radians(360 / vertices);
      points.push(point);
    }
    let prev = points[0];
    ctx.fillStyle = this.kind.color;
    ctx.beginPath();
    ctx.moveTo(prev.x, prev.y);
    for (let i = 1; i < points.length; i++) {
      const current = points[i];
      ctx.lineTo(current.x, current.y);
    }
    ctx.fill();

    if (this.selected) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.shape.radius + 5, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}
