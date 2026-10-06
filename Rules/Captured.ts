import City from '../City';
import Player from '@civ-clone/core-player/Player';
import Rule from '@civ-clone/core-rule/Rule';

// The city, who took it, who held it, and why, if the capture says (`City#capture`).
export class Captured extends Rule<[City, Player, Player, unknown], void> {}

export default Captured;
