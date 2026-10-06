import City from './City';
import DataObject from '@civ-clone/core-data-object/DataObject';

/**
 * A trade route held by `from()`, its home city, to `to()`. A route is one-way: only `from()` gains by it. What a route
 * is worth, how many a city can hold and when one replaces another are up to the ruleset; replacing a route changes
 * its `to()`, so it keeps its place among the city's routes.
 */
export class TradeRoute extends DataObject {
  private _from: City;
  private _to: City;

  constructor(from: City, to: City) {
    super();

    this._from = from;
    this._to = to;

    this.addKey('from', 'to');
  }

  from(): City {
    return this._from;
  }

  setTo(to: City): void {
    this._to = to;
  }

  to(): City {
    return this._to;
  }
}

export default TradeRoute;
