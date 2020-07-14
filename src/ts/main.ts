import { collections, world } from "@/environment";
import { Keyboard, Camera, renderHUD } from "./display";
import { Ship } from "./enemy";

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

collections.register(new Ship(0, 0));
world.init();

function draw() {
  if (world.ghost) {
    world.ghost.x = cameraMouse.x;
    world.ghost.y = cameraMouse.y;
  }
  collections.update();
  camera.render(collections.drawables);
  renderHUD();

  if (cameraMouse.pressed()) {
    collections.select(cameraMouse.x, cameraMouse.y);
    if (world.Ghost) {
      const obj = new world.Ghost(cameraMouse.x, cameraMouse.y);
      collections.register(obj);
    }
  }

  if (keyboard.pressed("Delete")) {
    collections.deleteSelection();
  }

  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
