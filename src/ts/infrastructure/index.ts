import { Miner } from "./Miner";
import { PowerNode } from "./PowerNode";
import { PowerCell } from "./PowerCell";
import { Infrastructure } from "./common";
import { Constructor, Buildable } from "../util";
export { Network } from "./network";

export const infrastructures: Array<Constructor<Infrastructure> & Buildable> = [
  Miner,
  PowerNode,
  PowerCell,
];

export { Miner, PowerNode, PowerCell, Infrastructure };
