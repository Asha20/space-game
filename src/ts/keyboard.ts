export class Keyboard {
  downMap: Map<string, boolean> = new Map();
  pressedMap: Map<string, boolean> = new Map();
  keydownHandler: (e: KeyboardEvent) => void;
  keyupHandler: (e: KeyboardEvent) => void;

  constructor() {
    this.keydownHandler = (e: KeyboardEvent) => {
      this.downMap.set(e.key, true);
      this.pressedMap.set(e.key, true);
    };

    this.keyupHandler = (e: KeyboardEvent) => {
      this.downMap.set(e.key, false);
      this.pressedMap.set(e.key, false);
    };

    window.addEventListener("keydown", this.keydownHandler);
    window.addEventListener("keyup", this.keyupHandler);
  }

  down(key: string) {
    return this.downMap.get(key);
  }

  pressed(key: string) {
    const val = this.pressedMap.get(key);
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
