import { random, rgby1 } from "@/util";
import { Infrastructure, InfrastructureConstructor } from "@/infrastructure";
import { Asteroid } from "./asteroid";
import * as collections from "./collections";

const MAP_WIDTH = 1000;
const MAP_HEIGHT = 1000;

function generateAsteroids(
  amount: number,
  mapWidth: number,
  mapHeight: number,
) {
  const asteroids = [];
  for (let i = 0; i < amount; i++) {
    const x = random.range(0, mapWidth);
    const y = random.range(0, mapHeight);
    const mass = random.range(100, 300);
    const asteroid = new Asteroid(x, y, mass);
    asteroids.push(asteroid);
  }
  return asteroids;
}

export const materials = rgby1(0);

export let Ghost: InfrastructureConstructor | null = null;
export let ghost: Infrastructure | null = null;

export function setGhost(NewGhost: InfrastructureConstructor | null) {
  if (Ghost === NewGhost) {
    return;
  }

  ghost?.destroy();
  if (NewGhost) {
    Ghost = NewGhost;
    ghost = Ghost && new Ghost(0, 0);
    ghost.ghost = true;
    collections.register(ghost);
  }
}

export function init() {
  setInterval(collections.tick, 100);
  for (const asteroid of generateAsteroids(30, MAP_WIDTH, MAP_HEIGHT)) {
    collections.register(asteroid);
  }
}
