import City from './City';
import DataObject from '@civ-clone/core-data-object/DataObject';
/**
 * A trade route held by `from()`, its home city, to `to()`. A route is one-way: only `from()` gains by it. What a route
 * is worth, how many a city can hold and when one replaces another are up to the ruleset; replacing a route changes
 * its `to()`, so it keeps its place among the city's routes.
 */
export declare class TradeRoute extends DataObject {
  private _from;
  private _to;
  constructor(from: City, to: City);
  from(): City;
  setTo(to: City): void;
  to(): City;
}
export default TradeRoute;
