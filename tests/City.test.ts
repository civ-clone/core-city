import Captured from '../Rules/Captured';
import Effect from '@civ-clone/core-rule/Effect';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import * as chai from 'chai';
import * as spies from 'chai-spies';
import setUpCity from './lib/setUpCity';
import Player from '@civ-clone/core-player/Player';
import Destroyed from '../Rules/Destroyed';
import Yield from '@civ-clone/core-yield/Yield';

const { expect, use } = chai;

use(spies);

describe('City', (): void => {
  it('should process `Captured` `Rule`s on `capture`', (): void => {
    const ruleRegistry = new RuleRegistry(),
      spy = chai.spy(),
      city = setUpCity('', ruleRegistry),
      originalPlayer = city.player(),
      player = new Player();

    ruleRegistry.register(new Captured(new Effect(spy)));

    expect(player).to.not.equal(originalPlayer);

    city.capture(player);

    expect(spy).to.called.once;
    expect(city.player()).to.equal(player);
    expect(city.originalPlayer()).to.equal(originalPlayer);
  });

  it('should process `Destroyed` `Rule`s on `destroy`', (): void => {
    const ruleRegistry = new RuleRegistry(),
      spy = chai.spy(),
      city = setUpCity('', ruleRegistry);

    ruleRegistry.register(new Destroyed(new Effect(spy)));

    city.destroy();

    expect(spy).to.called.once;
  });

  it('should be possible to rename the city', (): void => {
    const city = setUpCity('city #1');

    expect(city.name()).to.equal('city #1');

    city.setName('city #2');

    expect(city.name()).to.equal('city #2');
  });

  it('should be possible to get yields via `tilesWorked`', (): void => {
    const city = setUpCity(),
      tile = city.tile();

    expect(city.tilesWorked().length).to.equal(1);
    expect(city.tilesWorked()).to.include(tile);

    tile.yields = () => [new Yield(2)];

    const yields = city.yields();

    expect(yields.length).to.equal(1);
    expect(yields[0]).to.instanceof(Yield);
    expect(yields[0].value()).to.equal(2);
  });
});
