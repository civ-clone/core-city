import EntityRegistry, {
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';
import City from './City';
import TradeRoute from './TradeRoute';

export interface ITradeRouteRegistry extends IEntityRegistry<TradeRoute> {
  getByCity(city: City): TradeRoute[];
  getByPartner(city: City): TradeRoute[];
}

export class TradeRouteRegistry
  extends EntityRegistry<TradeRoute>
  implements ITradeRouteRegistry
{
  // A route's city is fixed; its partner changes when a better one replaces it (`setTo`), which says so
  //  (`keysChanged`) (civ-clone/web-renderer#308).
  private _byCity = this.index((route: TradeRoute): City => route.from());
  private _byPartner = this.index((route: TradeRoute): City => route.to());

  constructor() {
    super(TradeRoute);
  }

  /** The routes `city` holds, in the order they were set up. */
  getByCity(city: City): TradeRoute[] {
    return this._byCity.get(city);
  }

  /** The routes other cities hold to `city`. */
  getByPartner(city: City): TradeRoute[] {
    return this._byPartner.get(city);
  }
}

export const instance = new TradeRouteRegistry();

export default TradeRouteRegistry;
