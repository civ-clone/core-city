import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import Tile from '@civ-clone/core-world/Tile';
import WorkedTile from '../WorkedTile';
import WorkedTileRegistry from '../WorkedTileRegistry';
import { expect } from 'chai';
import { generateTile } from '@civ-clone/core-world/tests/lib/buildWorld';
import setUpCity from './lib/setUpCity';

describe('WorkedTileRegistry', (): void => {
  it("should return a city's worked tiles in the order they were registered, and each tile's worker", async (): Promise<void> => {
    const ruleRegistry = new RuleRegistry(),
      registry = new WorkedTileRegistry(ruleRegistry),
      city = await setUpCity('city', ruleRegistry, registry),
      other = await setUpCity('other', ruleRegistry, registry),
      tiles: Tile[] = await Promise.all(
        [1, 2, 3].map((): Promise<Tile> => generateTile(ruleRegistry))
      ),
      first = new WorkedTile(tiles[0], city),
      theirs = new WorkedTile(tiles[1], other),
      second = new WorkedTile(tiles[2], city);

    registry.register(first, theirs, second);

    expect(registry.getByCity(city)).to.deep.equal([first, second]);
    expect(registry.getByCity(other)).to.deep.equal([theirs]);
    expect(registry.getByTile(tiles[1])).to.equal(theirs);
    expect(registry.getTilesByCity(city).entries()).to.deep.equal([
      tiles[0],
      tiles[2],
    ]);
    expect(registry.tileIsWorked(tiles[2])).to.true;
  });

  it('should refuse a tile that is already worked, and free it when unregistered by tile', async (): Promise<void> => {
    const ruleRegistry = new RuleRegistry(),
      registry = new WorkedTileRegistry(ruleRegistry),
      city = await setUpCity('city', ruleRegistry, registry),
      other = await setUpCity('other', ruleRegistry, registry),
      tile = await generateTile(ruleRegistry),
      worked = new WorkedTile(tile, city);

    registry.register(worked);

    expect((): void => registry.register(new WorkedTile(tile, other))).to.throw(
      TypeError
    );

    registry.unregisterByTile(tile);

    expect(registry.getByTile(tile)).to.equal(null);
    expect(registry.getByCity(city)).to.deep.equal([]);
    expect(registry.tileIsWorked(tile)).to.false;
  });
});
