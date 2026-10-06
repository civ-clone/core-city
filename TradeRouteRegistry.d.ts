import EntityRegistry, {
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';
import City from './City';
import TradeRoute from './TradeRoute';
export interface ITradeRouteRegistry extends IEntityRegistry<TradeRoute> {
  getByCity(city: City): TradeRoute[];
  getByPartner(city: City): TradeRoute[];
}
export declare class TradeRouteRegistry
  extends EntityRegistry<TradeRoute>
  implements ITradeRouteRegistry
{
  constructor();
  /** The routes `city` holds, in the order they were set up. */
  getByCity(city: City): TradeRoute[];
  /** The routes other cities hold to `city`. */
  getByPartner(city: City): TradeRoute[];
}
export declare const instance: TradeRouteRegistry;
export default TradeRouteRegistry;
