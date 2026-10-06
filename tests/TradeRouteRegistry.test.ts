import TradeRoute from '../TradeRoute';
import TradeRouteRegistry from '../TradeRouteRegistry';
import { expect } from 'chai';
import setUpCity from './lib/setUpCity';

describe('TradeRouteRegistry', (): void => {
  it('should return the routes a `City` holds in order, and the routes to it', async (): Promise<void> => {
    const tradeRouteRegistry = new TradeRouteRegistry(),
      home = await setUpCity('home'),
      first = await setUpCity('first'),
      second = await setUpCity('second'),
      firstRoute = new TradeRoute(home, first),
      secondRoute = new TradeRoute(home, second),
      returnRoute = new TradeRoute(first, home);

    tradeRouteRegistry.register(firstRoute, secondRoute, returnRoute);

    expect(tradeRouteRegistry.getByCity(home)).to.deep.equal([
      firstRoute,
      secondRoute,
    ]);
    expect(tradeRouteRegistry.getByPartner(home)).to.deep.equal([returnRoute]);
    expect(tradeRouteRegistry.getByPartner(first)).to.deep.equal([firstRoute]);

    tradeRouteRegistry.unregister(firstRoute);

    expect(tradeRouteRegistry.getByCity(home)).to.deep.equal([secondRoute]);
    expect(tradeRouteRegistry.getByPartner(first)).to.deep.equal([]);
  });

  it('should keep a route in its place when its partner changes', async (): Promise<void> => {
    const tradeRouteRegistry = new TradeRouteRegistry(),
      home = await setUpCity('home'),
      first = await setUpCity('first'),
      second = await setUpCity('second'),
      third = await setUpCity('third'),
      firstRoute = new TradeRoute(home, first),
      secondRoute = new TradeRoute(home, second);

    tradeRouteRegistry.register(firstRoute, secondRoute);

    firstRoute.setTo(third);

    expect(firstRoute.from()).to.equal(home);
    expect(tradeRouteRegistry.getByCity(home)).to.deep.equal([
      firstRoute,
      secondRoute,
    ]);
    expect(tradeRouteRegistry.getByPartner(first)).to.deep.equal([]);
    expect(tradeRouteRegistry.getByPartner(third)).to.deep.equal([firstRoute]);
  });
});
