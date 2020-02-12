import { Keyboard } from "./keyboard";
import { Camera } from "./camera";
import { Drawable } from "./util";
import { Asteroid } from "./asteroid";

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

const camera = new Camera(ctx, ({ up, down, left, right }) => {
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
});

const drawables: Drawable[] = [];

const testAsteroid = new Asteroid(30, 30, 20);
drawables.push(testAsteroid);

function draw() {
  camera.render(drawables);

  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
