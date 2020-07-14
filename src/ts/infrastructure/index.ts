import { Miner } from "./Miner";
import { PowerNode } from "./PowerNode";
import { PowerCell } from "./PowerCell";
import { Turret } from "./Turret";
import { Infrastructure, InfrastructureConstructor } from "./Infrastructure";
export * as Network from "./network";

export const infrastructures: Array<InfrastructureConstructor> = [
  Miner,
  PowerNode,
  PowerCell,
  Turret,
];

export {
  Miner,
  PowerNode,
  PowerCell,
  Turret,
  Infrastructure,
  InfrastructureConstructor,
};
