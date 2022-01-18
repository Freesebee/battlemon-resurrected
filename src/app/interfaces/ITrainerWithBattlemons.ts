import IBattlemon from './IBattlemon';
import ITrainer from './ITrainer';

export default interface ITrainerWithBattlemons extends ITrainer {
  battlemonSlots: IBattlemon[];
}
