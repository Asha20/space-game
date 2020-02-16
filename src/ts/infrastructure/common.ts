import { Miner } from "./Miner";
import { PowerNode } from "./PowerNode";
import { PowerCell } from "./PowerCell";

export type Infrastructure = Miner | PowerNode | PowerCell;
export type Network = Set<Infrastructure>;

export interface InfrastructureConstructor {
  new (x: number, y: number): Infrastructure;
}
