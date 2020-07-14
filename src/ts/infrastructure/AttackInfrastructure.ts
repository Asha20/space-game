import { distance, Attack, Tickable } from "@/util";
import { Enemy } from "@/enemy";
import { collections } from "@/environment";
import { Infrastructure } from "./Infrastructure";

export abstract class AttackInfrastructure extends Infrastructure
  implements Tickable {
  target: Enemy | undefined;
  abstract attack: Attack;
  abstract getTarget(): Enemy | undefined;

  inRange(target: Enemy) {
    return distance(this, target) <= this.attack.range;
  }

  tick(id: number) {
    if (!this.network.powered) {
      return;
    }

    if (!this.target || !this.inRange(this.target)) {
      return;
    }

    if (id % this.attack.rate === 0) {
      this.shoot(this.target);
    }
  }

  update() {
    super.update();

    if (!this.target || (this.target && this.target.health.current <= 0)) {
      this.target = this.getTarget();
    }
  }

  shoot(target: Enemy) {
    const projectile = new this.attack.Projectile(this.x, this.y, target);
    collections.register(projectile);
  }
}
