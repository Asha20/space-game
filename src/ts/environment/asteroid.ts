import {
  random,
  Vector,
  Drawable,
  Destroyable,
  Selectable,
  Collidable,
  shape,
} from "@/util";
import * as collections from "./collections";

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

export class Asteroid implements Drawable, Destroyable, Selectable, Collidable {
  x: number;
  y: number;
  ghost = false;
  selected = false;
  artificial = false;
  solid = true;
  mass: number;
  kind: AsteroidKind;
  seed: number;

  speed: number;
  direction: number;
  rotationSpeed: number;
  rotation = 0;

  constructor(x: number, y: number, mass: number) {
    this.x = x;
    this.y = y;
    this.seed = random.getSeed();
    this.mass = mass / 6;
    this.kind = random.choose(kinds);

    this.speed = random.rangeFloat(0.01, 0.05);
    this.direction = random.rangeFloat(0, 2 * Math.PI);
    this.rotationSpeed = random.rangeFloat(-0.001, 0.001);
  }

  get shape() {
    const radius = Math.ceil(this.mass / 5) * 5;
    return shape.circle(radius);
  }

  static shouldSpawn() {
    return random.dice(15);
  }

  destroy() {
    collections.destroy(this);
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.mass <= 0) {
      this.destroy();
    }

    this.x += this.speed * Math.cos(this.direction);
    this.y += this.speed * Math.sin(this.direction);
    this.rotation += this.rotationSpeed;

    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.translate(-this.x, -this.y);

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
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.fillStyle = this.kind.color;
    ctx.beginPath();
    ctx.moveTo(prev.x, prev.y);
    for (let i = 1; i < points.length; i++) {
      const current = points[i];
      ctx.lineTo(current.x, current.y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    if (this.selected) {
      ctx.strokeStyle = "white";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.shape.radius + 5, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}
