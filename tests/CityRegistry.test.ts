import Captured from '../Rules/Captured';
import City from '../City';
import CityRegistry from '../CityRegistry';
import Effect from '@civ-clone/core-rule/Effect';
import Player from '@civ-clone/core-player/Player';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
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
  it('should find a captured `City` by its new owner, in the order cities were registered', async (): Promise<void> => {
    const ruleRegistry = new RuleRegistry(),
      cityRegistry = new CityRegistry(),
      first = await setUpCity('city #1', ruleRegistry),
      second = await setUpCity('city #2', ruleRegistry),
      third = await setUpCity('city #3', ruleRegistry),
      owner = first.player(),
      captor = new Player(ruleRegistry);

    second.capture(owner);
    third.capture(owner);
    cityRegistry.register(first, second, third);

    expect(cityRegistry.getByPlayer(owner)).to.deep.equal([
      first,
      second,
      third,
    ]);

    first.capture(captor);

    expect(cityRegistry.getByPlayer(owner)).to.deep.equal([second, third]);
    expect(cityRegistry.getByPlayer(captor)).to.deep.equal([first]);

    // Taken back, it's where it was: the order is the registry's, not the order of capture (civ-clone/web-renderer#308).
    first.capture(owner);

    expect(cityRegistry.getByPlayer(owner)).to.deep.equal([
      first,
      second,
      third,
    ]);
    expect(cityRegistry.getByPlayer(captor)).to.deep.equal([]);
  });

  it('should file a captured `City` under its new owner before the `Captured` rules run', async (): Promise<void> => {
    // The rules may look the city up by its new owner, which is why `capture` re-files it first.
    const ruleRegistry = new RuleRegistry(),
      cityRegistry = new CityRegistry(),
      city = await setUpCity('city #1', ruleRegistry),
      captor = new Player(ruleRegistry),
      seen: { captor: City[]; previous: City[] }[] = [];

    ruleRegistry.register(
      new Captured(
        new Effect((captured: City, capturingPlayer: Player, from: Player) =>
          seen.push({
            captor: cityRegistry.getByPlayer(capturingPlayer),
            previous: cityRegistry.getByPlayer(from),
          })
        )
      )
    );

    cityRegistry.register(city);
    city.capture(captor);

    expect(seen).to.deep.equal([{ captor: [city], previous: [] }]);
  });

  it('should leave out a destroyed `City` unless asked', async (): Promise<void> => {
    const ruleRegistry = new RuleRegistry(),
      cityRegistry = new CityRegistry(),
      city = await setUpCity('city #1', ruleRegistry);

    cityRegistry.register(city);
    city.destroy();

    expect(cityRegistry.getByPlayer(city.player())).to.deep.equal([]);
    expect(cityRegistry.getByPlayer(city.player(), true)).to.deep.equal([city]);
  });
});
