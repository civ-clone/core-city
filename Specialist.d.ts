import City from './City';
import DataObject from '@civ-clone/core-data-object/DataObject';
/**
 * A citizen of `city` who works no tile. What a `Specialist` produces is up to the ruleset: its class is its type, so
 * changing one means replacing it with an instance of another class from `AvailableSpecialistRegistry`.
 */
export declare class Specialist extends DataObject {
  private _city;
  constructor(city: City);
  city(): City;
}
export default Specialist;
