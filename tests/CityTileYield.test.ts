import City from '../City';
import CityTileYield from '../Rules/CityTileYield';
import Criterion from '@civ-clone/core-rule/Criterion';
import Effect from '@civ-clone/core-rule/Effect';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import Tile from '@civ-clone/core-world/Tile';
import TileYield from '@civ-clone/core-world/Rules/Yield';
import { WorkedTileRegistry } from '../WorkedTileRegistry';
import YieldValue from '@civ-clone/core-yield/Yield';
import { expect } from 'chai';
import { generateTile } from '@civ-clone/core-world/tests/lib/buildWorld';
import setUpCity from './lib/setUpCity';

class Food extends YieldValue {}
class Trade extends YieldValue {}

// A city on a registry of its own, not the shared instance, with every square giving 2 food (from two providers) and
//  1 trade.
const setUp = async (): Promise<{
  city: City;
  ruleRegistry: RuleRegistry;
  tile: Tile;
}> => {
  const ruleRegistry = new RuleRegistry();

  ruleRegistry.register(
    new TileYield(
      new Effect((): YieldValue[] => {
        const food = new Food(1, 'terrain');

        food.add(1, 'irrigation');

        return [food, new Trade(1, 'river')];
      })
    )
  );

  const city = await setUpCity('city', ruleRegistry, new WorkedTileRegistry());

  return {
    city,
    ruleRegistry,
    tile: city.tile(),
  };
};

describe('City#tileYields', (): void => {
  it("is the tile's own yields when no `CityTileYield` rule is registered", async (): Promise<void> => {
    const { city, tile } = await setUp();

    expect(city.tileYieldRules()).to.be.empty;
    expect(city.tileYields(tile) === tile.yields(city.player())).true;
    expect(city.tileYields(tile, []) === tile.yields(city.player())).true;
    expect(city.tileYields(tile).map((tileYield) => tileYield.value())).to.eql([
      2, 1,
    ]);
  });

  it('runs the rules in order on copies, leaving the tile as it is', async (): Promise<void> => {
    const { city, ruleRegistry, tile } = await setUp(),
      seen: number[] = [];

    ruleRegistry.register(
      new CityTileYield(
        new Effect((city: City, tile: Tile, yields: YieldValue[]): void =>
          yields
            .filter((tileYield) => tileYield instanceof Food)
            .forEach((tileYield) => tileYield.add(1, 'harbour'))
        )
      ),
      new CityTileYield(
        new Effect((city: City, tile: Tile, yields: YieldValue[]): void => {
          seen.push(...yields.map((tileYield) => tileYield.value()));

          yields
            .filter((tileYield) => tileYield.value() > 2)
            .forEach((tileYield) => tileYield.subtract(1, 'despotism'));
        })
      )
    );

    const yields = city.tileYields(tile);

    expect(city.tileYieldRules()).to.have.length(2);
    // The second rule saw the first one's +1.
    expect(seen).to.eql([3, 1]);
    expect(yields.map((tileYield) => tileYield.constructor)).to.eql([
      Food,
      Trade,
    ]);
    expect(yields.map((tileYield) => tileYield.values())).to.eql([
      [
        [1, 'terrain'],
        [1, 'irrigation'],
        [1, 'harbour'],
        [-1, 'despotism'],
      ],
      [[1, 'river']],
    ]);

    // The tile's cached yields are untouched.
    expect(
      tile.yields(city.player()).map((tileYield) => tileYield.values())
    ).to.eql([
      [
        [1, 'terrain'],
        [1, 'irrigation'],
      ],
      [[1, 'river']],
    ]);
    expect(yields[0] === tile.yields(city.player())[0]).false;
  });

  it('only runs a rule whose criteria are met, and uses the rules it is given', async (): Promise<void> => {
    const { city, ruleRegistry, tile } = await setUp(),
      other = await generateTile(ruleRegistry);

    ruleRegistry.register(
      new CityTileYield(
        new Criterion((city: City, square: Tile): boolean => square === tile),
        new Effect((city: City, tile: Tile, yields: YieldValue[]): void =>
          yields.forEach((tileYield) => tileYield.add(2, 'centre'))
        )
      )
    );

    expect(city.tileYields(tile).map((tileYield) => tileYield.value())).to.eql([
      4, 3,
    ]);
    expect(city.tileYields(other).map((tileYield) => tileYield.value())).to.eql(
      [2, 1]
    );

    // Rules fetched once for many squares give the same answer, and an empty list skips them.
    const rules = city.tileYieldRules();

    expect(
      city.tileYields(tile, rules).map((tileYield) => tileYield.value())
    ).to.eql([4, 3]);
    expect(city.tileYields(tile, []) === tile.yields(city.player())).true;
  });

  it('gives the rules it was made with', async (): Promise<void> => {
    const { city, ruleRegistry } = await setUp();

    expect(city.ruleRegistry() === ruleRegistry).true;
  });

  it('leaves a disabled rule out', async (): Promise<void> => {
    const { city, ruleRegistry, tile } = await setUp(),
      rule = new CityTileYield(
        new Effect((city: City, tile: Tile, yields: YieldValue[]): void =>
          yields.forEach((tileYield) => tileYield.add(5))
        )
      );

    ruleRegistry.register(rule);
    rule.disable();

    expect(city.tileYieldRules()).to.be.empty;
    expect(city.tileYields(tile) === tile.yields(city.player())).true;
  });
});
