import { Miner } from "./Miner";
import { PowerNode } from "./PowerNode";
import { PowerCell } from "./PowerCell";
import { Infrastructure } from "./Infrastructure";
import { Buildable } from "../util";
export { Network } from "./network";

export interface InfrastructureConstructor {
  new (x: number, y: number): Infrastructure;
}

export const infrastructures: Array<InfrastructureConstructor & Buildable> = [
  Miner,
  PowerNode,
  PowerCell,
];

export { Miner, PowerNode, PowerCell, Infrastructure };
