import { Keyboard } from "./input";
import { Camera } from "./camera";
import { Miner } from "./infrastructure/miner";
import * as world from "./environment/world";

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

const ghostMiner = new Miner(cameraMouse.x, cameraMouse.y);
world.register(ghostMiner);

function draw() {
  ghostMiner.x = cameraMouse.x;
  ghostMiner.y = cameraMouse.y;
  camera.render(world.drawables);

  if (cameraMouse.pressed()) {
    const miner = new Miner(cameraMouse.x, cameraMouse.y);
    world.register(miner);
  }

  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
