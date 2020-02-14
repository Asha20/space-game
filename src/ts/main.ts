import { Keyboard } from "./keyboard";
import { Camera } from "./camera";
import { Drawable } from "./util";
import { Asteroid } from "./environment/asteroid";

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

const drawables: Drawable[] = [];

const testAsteroid = new Asteroid(0, 0, 20);
drawables.push(
  testAsteroid,
  new Asteroid(0, 100, 30),
  new Asteroid(0, 200, 40),
);

function draw() {
  camera.render(drawables);

  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
