import City from './City';
import DataObject from '@civ-clone/core-data-object/DataObject';

/**
 * A citizen of `city` who works no tile. What a `Specialist` produces is up to the ruleset: its class is its type, so
 * changing one means replacing it with an instance of another class from `AvailableSpecialistRegistry`.
 */
export class Specialist extends DataObject {
  private _city: City;

  constructor(city: City) {
    super();

    this._city = city;

    this.addKey('city');
  }

  city(): City {
    return this._city;
  }
}

export default Specialist;
