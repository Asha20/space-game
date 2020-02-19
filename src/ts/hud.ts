import { materials, setGhost } from "./environment/world";
import { infrastructures, Infrastructure } from "./infrastructure/index";
import { Constructor, Buildable } from "./util";

const hud = document.querySelector(".hud")!;
const qs = (selector: string) => hud.querySelector(selector)!;

const workCanvas = document.createElement("canvas");
const workWidth = (workCanvas.width = 64);
const workHeight = (workCanvas.height = 64);
const workCtx = workCanvas.getContext("2d")!;

const DOM = {
  hud,
  redonium: qs(".redonium"),
  blutonium: qs(".blutonium"),
  yellorium: qs(".yellorium"),
  greenorium: qs(".greenorium"),
  buildables: qs(".buildables"),

  selected: {
    name: qs(".selected .name"),
    description: qs(".selected .description"),
    cost: qs(".selected .cost"),
  },
};

DOM.buildables.addEventListener("mousedown", e => {
  if (!e.target) {
    return;
  }

  const target = e.target as HTMLElement;
  if (!target.matches(".structure")) {
    return;
  }

  const Selected = imgToStructure.get(target)!;
  setGhost(Selected);

  DOM.selected.name.textContent = Selected.name;
  DOM.selected.cost.textContent = JSON.stringify(Selected.cost, null, 2);
  DOM.selected.description.textContent = Selected.description;
});

DOM.buildables.addEventListener("mousemove", e => {
  if (!e.target) {
    return;
  }

  const target = e.target as HTMLElement;
  if (!target.matches(".structure")) {
    return;
  }
});

const imgToStructure = new Map<
  HTMLElement,
  Constructor<Infrastructure> & Buildable
>();

for (const Infrastructure of infrastructures) {
  const self = Infrastructure.display;
  const { width, height } = self;

  workCtx.clearRect(0, 0, workWidth, workHeight);
  workCtx.translate(workWidth / 2, workHeight / 2);
  workCtx.scale(workWidth / width / 1.5, workHeight / height / 1.5);
  self.draw(workCtx);
  workCtx.setTransform(1, 0, 0, 1, 0, 0);

  const img = document.createElement("img");
  img.classList.add("structure");
  img.draggable = false;
  img.src = workCanvas.toDataURL();
  DOM.buildables.appendChild(img);
  imgToStructure.set(img, Infrastructure);
}

export function render() {
  DOM.redonium.textContent = String(materials.redonium);
  DOM.blutonium.textContent = String(materials.blutonium);
  DOM.yellorium.textContent = String(materials.yellorium);
  DOM.greenorium.textContent = String(materials.greenorium);
}
