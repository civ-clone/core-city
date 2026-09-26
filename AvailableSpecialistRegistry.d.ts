import {
  ConstructorRegistry,
  IConstructorRegistry,
} from '@civ-clone/core-registry/ConstructorRegistry';
import Specialist from './Specialist';
/**
 * The kinds of `Specialist` a ruleset offers, in the order a player cycles through them. The first is the kind a
 * citizen becomes when they stop working a tile.
 */
export interface IAvailableSpecialistRegistry
  extends IConstructorRegistry<Specialist> {}
export declare class AvailableSpecialistRegistry
  extends ConstructorRegistry<Specialist>
  implements IAvailableSpecialistRegistry
{
  constructor();
}
export declare const instance: AvailableSpecialistRegistry;
export default AvailableSpecialistRegistry;
