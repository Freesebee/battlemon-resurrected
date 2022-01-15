import { BattlemonType } from "../enums/BattlemonType";

export default interface IBattlemon {
    id: number,
    name: string,
    type: BattlemonType,
    dmg: number,
    hp: number,
    crit_chance: number,
}