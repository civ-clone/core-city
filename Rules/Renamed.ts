import City from '../City';
import Rule from '@civ-clone/core-rule/Rule';

// The city, under its new name, and the name it had (`City#setName`): for a ruleset to keep the new one from being
//  given to another city (civ-clone/web-renderer#876).
export class Renamed extends Rule<[City, string], void> {}

export default Renamed;
