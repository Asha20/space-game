import { Drawable } from "../util";
import * as random from "../random";

type Context = CanvasRenderingContext2D;
interface Vector {
  x: number;
  y: number;
}

const colors = ["#ff4c4c", "#ff9d4c", "#3dcd3d", "#2e9c9c"];

function radians(degrees: number) {
  return (degrees / 180) * Math.PI;
}

export class Asteroid implements Drawable {
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
  color: string;
  seed: number;

  constructor(x: number, y: number, radius: number) {
    this.x = x;
    this.y = y;
    this.seed = random.getSeed();
    this.radius = radius;
    this.width = this.height = radius * 2;
    const colorIndex = random.range(0, colors.length - 1);
    this.color = colors[colorIndex];
  }

  static shouldSpawn() {
    return random.dice(15);
  }

  draw(ctx: Context) {
    random.setSeed(this.seed);
    ctx.fillStyle = this.color;

    const vertices = 10;
    let angle = 0;

    const points: Vector[] = [];
    for (let i = 0; i < vertices; i++) {
      const point: Vector = {
        x: this.x + Math.cos(angle) * random.rangeFloat(0.6, 1) * this.radius,
        y: this.y + Math.sin(angle) * random.rangeFloat(0.6, 1) * this.radius,
      };
      angle += radians(360 / vertices);
      points.push(point);
    }
    let prev = points[0];
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(prev.x, prev.y);
    for (let i = 1; i < points.length; i++) {
      const current = points[i];
      ctx.lineTo(current.x, current.y);
    }
    ctx.fill();
  }
}
