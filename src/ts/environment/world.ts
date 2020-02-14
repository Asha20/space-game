import { Asteroid } from "./asteroid";
import * as random from "../random";
import { Drawable } from "../util";
import { Miner } from "../infrastructure/miner";

const width = 1000;
const height = 1000;

function generateAsteroids(amount: number) {
  const asteroids = [];
  for (let i = 0; i < amount; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);
    const radius = random.range(20, 50);
    const asteroid = new Asteroid(x, y, radius);
    asteroids.push(asteroid);
  }
  return asteroids;
}

export const asteroids: Asteroid[] = generateAsteroids(15);
export const drawables: Drawable[] = [...asteroids];
export const miners: Miner[] = [];
