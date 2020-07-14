import { Miner } from "./Miner";
import { PowerNode } from "./PowerNode";
import { PowerCell } from "./PowerCell";
import { Infrastructure } from "./Infrastructure";
export * as Network from "./network";

export interface InfrastructureConstructor {
  new (x: number, y: number): Infrastructure;
}

export const infrastructures: Array<InfrastructureConstructor> = [
  Miner,
  PowerNode,
  PowerCell,
];

export { Miner, PowerNode, PowerCell, Infrastructure };
