import { Vector } from "./util";

export class Keyboard {
  downMap: Map<string, boolean> = new Map();
  pressedMap: Map<string, boolean> = new Map();
  lastKey: string = "";
  keydownHandler: (e: KeyboardEvent) => void;
  keyupHandler: (e: KeyboardEvent) => void;

  constructor() {
    this.keydownHandler = (e: KeyboardEvent) => {
      this.downMap.set(e.key, true);
      this.pressedMap.set(e.key, true);
      this.lastKey = e.key;
    };

    this.keyupHandler = (e: KeyboardEvent) => {
      this.downMap.set(e.key, false);
      this.pressedMap.set(e.key, false);
    };

    window.addEventListener("keydown", this.keydownHandler);
    window.addEventListener("keyup", this.keyupHandler);
  }

  down(key: string) {
    return Boolean(this.downMap.get(key));
  }

  pressed(key: string) {
    const val = Boolean(this.pressedMap.get(key));
    if (val) {
      this.pressedMap.set(key, false);
    }
    return val;
  }

  detach() {
    window.removeEventListener("keydown", this.keydownHandler);
    window.removeEventListener("keyup", this.keyupHandler);
  }
}

export class Mouse {
  absX: number = 0;
  absY: number = 0;
  x: number = 0;
  y: number = 0;
  isDown: boolean = false;
  isPressed: boolean = false;
  recalculate: () => void;
  mousedownHandler: (e: MouseEvent) => void;
  mouseupHandler: (e: MouseEvent) => void;
  mousemoveHandler: (e: MouseEvent) => void;

  constructor(el: HTMLElement, recalculate?: (pos: Vector) => Vector) {
    const rect = el.getBoundingClientRect();

    this.mousedownHandler = () => {
      this.isDown = true;
      this.isPressed = true;
    };

    this.mouseupHandler = () => {
      this.isDown = false;
      this.isPressed = false;
    };

    this.mousemoveHandler = (e: MouseEvent) => {
      this.absX = e.clientX - rect.left;
      this.absY = e.clientY - rect.top;
      this.recalculate();
    };

    this.recalculate = () => {
      const newPos = recalculate?.({ x: this.absX, y: this.absY });
      if (newPos) {
        this.x = newPos.x;
        this.y = newPos.y;
      }
    };

    window.addEventListener("mousedown", this.mousedownHandler);
    window.addEventListener("mouseup", this.mouseupHandler);
    window.addEventListener("mousemove", this.mousemoveHandler);
  }

  down() {
    return this.isPressed;
  }

  pressed() {
    const val = this.isPressed;
    if (val) {
      this.isPressed = false;
    }
    return val;
  }

  detach() {
    window.removeEventListener("mousedown", this.mousedownHandler);
    window.removeEventListener("mouseup", this.mouseupHandler);
    window.removeEventListener("mousemove", this.mousemoveHandler);
  }
}
