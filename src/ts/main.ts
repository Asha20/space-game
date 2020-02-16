import { Keyboard } from "./input";
import { Camera } from "./camera";
import { Miner, PowerNode, PowerCell } from "./infrastructure/index";
import * as world from "./environment/world";
import { InfrastructureConstructor } from "./infrastructure/common";

const canvas = document.querySelector<HTMLCanvasElement>("#app");
if (!canvas) {
  throw new Error("Missing canvas #app");
}

const width = canvas.offsetWidth;
const height = canvas.offsetHeight;
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext("2d")!;

const keyboard = new Keyboard();

const camera = new Camera(ctx, ({ up, down, left, right, zoomIn, zoomOut }) => {
  if (keyboard.down("w")) {
    up();
  }
  if (keyboard.down("s")) {
    down();
  }
  if (keyboard.down("a")) {
    left();
  }
  if (keyboard.down("d")) {
    right();
  }
  if (keyboard.pressed("e")) {
    zoomIn();
  }
  if (keyboard.pressed("q")) {
    zoomOut();
  }
});

const cameraMouse = camera.mouse;

const ghostTypes = [Miner, PowerNode, PowerCell];

let Ghost: InfrastructureConstructor = PowerNode;
let ghost = new Ghost(0, 0);
(ghost as any).__ghost = true;
world.register(ghost);

function draw() {
  ghost.x = cameraMouse.x;
  ghost.y = cameraMouse.y;
  world.update();
  camera.render(world.drawables);

  if (keyboard.pressed("1") || keyboard.pressed("2") || keyboard.pressed("3")) {
    const index = Number(keyboard.lastKey) - 1;
    ghost.destroy();
    Ghost = ghostTypes[index];
    ghost = new Ghost(cameraMouse.x, cameraMouse.y);
    (ghost as any).__ghost = true;
    world.register(ghost);
  }

  if (keyboard.pressed("4")) {
    ghost.destroy();
  }

  if (cameraMouse.pressed()) {
    const miner = new Ghost(cameraMouse.x, cameraMouse.y);
    world.register(miner);
  }

  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);

(window as any).world = world;
