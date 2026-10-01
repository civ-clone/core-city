import CityRegistry from '../CityRegistry';
import Player from '@civ-clone/core-player/Player';
import { expect } from 'chai';
import setUpCity from './lib/setUpCity';

describe('CityRegistry', (): void => {
  it('should return the `City` on a `Tile`, or `null`', async (): Promise<void> => {
    const cityRegistry = new CityRegistry(),
      city = await setUpCity('city #1'),
      otherCity = await setUpCity('city #2'),
      emptyCity = await setUpCity('city #3');

    cityRegistry.register(city, otherCity);

    expect(cityRegistry.getByTile(city.tile())).to.equal(city);
    expect(cityRegistry.getByTile(otherCity.tile())).to.equal(otherCity);
    expect(cityRegistry.getByTile(emptyCity.tile())).to.equal(null);
  });

  it('should find a `City` registered before or after it was asked about', async (): Promise<void> => {
    const cityRegistry = new CityRegistry(),
      city = await setUpCity('city #1');

    expect(cityRegistry.getByTile(city.tile())).to.equal(null);

    cityRegistry.register(city);

    expect(cityRegistry.getByTile(city.tile())).to.equal(city);
  });

  it('should not return a `City` once it is unregistered', async (): Promise<void> => {
    const cityRegistry = new CityRegistry(),
      city = await setUpCity('city #1');

    cityRegistry.register(city);
    cityRegistry.unregister(city);

    expect(cityRegistry.getByTile(city.tile())).to.equal(null);
  });

  it('should not return a destroyed `City`', async (): Promise<void> => {
    const cityRegistry = new CityRegistry(),
      city = await setUpCity('city #1');

    cityRegistry.register(city);
    city.destroy(new Player());

    expect(cityRegistry.getByTile(city.tile())).to.equal(null);
  });

  it('should still find a `City` after it is captured', async (): Promise<void> => {
    const cityRegistry = new CityRegistry(),
      city = await setUpCity('city #1');

    cityRegistry.register(city);
    city.capture(new Player());

    expect(cityRegistry.getByTile(city.tile())).to.equal(city);
  });
});
