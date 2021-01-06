import City from '../City';
import { IRuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Rule from '@civ-clone/core-rule/Rule';

export class Created extends Rule<[City], void> {}

export default Created;

export interface ICreatedRegistry
  extends IRuleRegistry<Created, [City], void> {}
