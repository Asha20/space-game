import { Keyboard } from "./input";
import { Camera } from "./camera";
import * as world from "./environment/world";
import * as hud from "./hud";
import { ghost, Ghost } from "./environment/world";
import { Ship } from "./enemy/index";

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

const ship = new Ship(0, 0);
world.register(ship);

function draw() {
  if (ghost) {
    ghost.x = cameraMouse.x;
    ghost.y = cameraMouse.y;
  }
  world.update();
  camera.render(world.drawables);
  hud.render();

  if (cameraMouse.pressed()) {
    world.select(cameraMouse.x, cameraMouse.y);
    if (Ghost) {
      const obj = new Ghost(cameraMouse.x, cameraMouse.y);
      world.register(obj);
    }
  }

  if (keyboard.pressed("Delete")) {
    world.deleteSelection();
  }

  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
