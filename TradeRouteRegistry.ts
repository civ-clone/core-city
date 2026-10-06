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
  constructor() {
    super(TradeRoute);
  }

  /** The routes `city` holds, in the order they were set up. */
  getByCity(city: City): TradeRoute[] {
    return this.getBy('from', city);
  }

  /** The routes other cities hold to `city`. */
  getByPartner(city: City): TradeRoute[] {
    return this.getBy('to', city);
  }
}

export const instance = new TradeRouteRegistry();

export default TradeRouteRegistry;
