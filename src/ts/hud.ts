import { materials } from "./environment/world";

const hud = document.querySelector(".hud")!;
const qs = (selector: string) => hud.querySelector(selector)!;

const DOM = {
  hud,
  redonium: qs(".redonium"),
  blutonium: qs(".blutonium"),
  yellorium: qs(".yellorium"),
  greenorium: qs(".greenorium"),
};

export function render() {
  DOM.redonium.textContent = String(materials.redonium);
  DOM.blutonium.textContent = String(materials.blutonium);
  DOM.yellorium.textContent = String(materials.yellorium);
  DOM.greenorium.textContent = String(materials.greenorium);
}
