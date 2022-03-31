import Captured from '../Rules/Captured';
import Effect from '@civ-clone/core-rule/Effect';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import * as chai from 'chai';
import * as spies from 'chai-spies';
import setUpCity from './lib/setUpCity';
import Player from '@civ-clone/core-player/Player';
import Destroyed from '../Rules/Destroyed';
import Yield from '../Rules/Yield';
import YieldValue from '@civ-clone/core-yield/Yield';
import YieldModifier from '../Rules/YieldModifier';
import City from '../City';
import Cost from '../Rules/Cost';
import Created from '../Rules/Created';
import { reduceYield } from '@civ-clone/core-yield/lib/reduceYields';
import Rule from '@civ-clone/core-rule/Rule';

const { expect, use } = chai;

use(spies);

describe('City', (): void => {
  it('should process `Created`, `Destroyed` and `Captured` `Rule`s', async (): Promise<void> => {
    const ruleRegistry = new RuleRegistry(),
      destroyedSpy = chai.spy(),
      createdSpy = chai.spy(),
      capturedSpy = chai.spy(),
      capturingPlayer = new Player(ruleRegistry),
      destroyingPlayer = new Player(ruleRegistry);

    ruleRegistry.register(
      new Captured(new Effect(capturedSpy)),
      new Created(new Effect(createdSpy)),
      new Destroyed(new Effect(destroyedSpy))
    );

    [destroyedSpy, createdSpy, capturedSpy].forEach(
      (spy) => expect(spy).not.called
    );

    const city = await setUpCity('city #1', ruleRegistry),
      originalPlayer = city.player();

    expect(createdSpy).called.with(city);
    expect(city.originalPlayer()).to.equal(originalPlayer);

    city.capture(capturingPlayer);

    expect(capturedSpy).called.with(city, capturingPlayer, originalPlayer);
    expect(city.player()).to.equal(capturingPlayer);
    expect(city.originalPlayer()).to.equal(originalPlayer);

    city.destroy(destroyingPlayer);

    expect(destroyedSpy).to.called.with(city, destroyingPlayer);
  });

  it('should be possible to rename the city', async (): Promise<void> => {
    const city = await setUpCity('city #1');

    expect(city.name()).to.equal('city #1');

    city.setName('city #2');

    expect(city.name()).to.equal('city #2');
  });

  it('should be possible to get yields via `tilesWorked`', async (): Promise<void> => {
    const ruleRegistry = new RuleRegistry(),
      city = await setUpCity('name', ruleRegistry),
      tile = city.tile();

    ruleRegistry.register(new Yield(new Effect(() => new YieldValue(2))));

    expect(city.tilesWorked().length).to.equal(1);
    expect(city.tilesWorked()).to.include(tile);

    const yields = city.yields();

    expect(yields.length).to.equal(1);
    expect(yields[0]).to.instanceof(YieldValue);
    expect(yields[0].value()).to.equal(2);
  });

  it('should correctly return the expected `Yield`s, applying `YieldModifier`s and `Cost`s', async (): Promise<void> => {
    const ruleRegistry = new RuleRegistry(),
      city = await setUpCity('name', ruleRegistry);

    (
      [
        [new Yield(new Effect(() => new YieldValue(3, 'BaseValue'))), 3],
        [
          new YieldModifier(
            new Effect(
              (city: City, yields: YieldValue[]) =>
                new YieldValue(
                  Math.floor(reduceYield(yields, YieldValue) * 0.5),
                  'Modifier'
                )
            )
          ),
          4,
        ],
        [new Cost(new Effect(() => new YieldValue(-1, 'Reduction'))), 3],
      ] as [Rule, number][]
    ).forEach(([rule, expectedValue]) => {
      ruleRegistry.register(rule);

      expect(reduceYield(city.yields(), YieldValue)).equal(expectedValue);
    });
  });
});
