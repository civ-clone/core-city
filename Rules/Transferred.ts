import City from '../City';
import Player from '@civ-clone/core-player/Player';
import Rule from '@civ-clone/core-rule/Rule';

// The city, who has it now, and who had it (`City#transfer`): a change of owner that isn't a capture.
export class Transferred extends Rule<[City, Player, Player], void> {}

export default Transferred;
