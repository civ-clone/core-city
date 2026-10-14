import City from '../City';
import Effect from '@civ-clone/core-rule/Effect';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import Tile from '@civ-clone/core-world/Tile';
import TileReleased from '../Rules/TileReleased';
import TileWorked from '../Rules/TileWorked';
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

  it('should process TileWorked once for each tile it registers, with the tile already worked', async (): Promise<void> => {
    const ruleRegistry = new RuleRegistry(),
      registry = new WorkedTileRegistry(ruleRegistry),
      city = await setUpCity('city', ruleRegistry, registry),
      tiles: Tile[] = await Promise.all(
        [1, 2].map((): Promise<Tile> => generateTile(ruleRegistry))
      ),
      worked: [City, Tile, boolean][] = [];

    ruleRegistry.register(
      new TileWorked(
        new Effect((city: City, tile: Tile): void => {
          worked.push([city, tile, registry.getByTile(tile)?.city() === city]);
        })
      )
    );

    registry.register(
      new WorkedTile(tiles[0], city),
      new WorkedTile(tiles[1], city)
    );

    expect(worked).to.deep.equal([
      [city, tiles[0], true],
      [city, tiles[1], true],
    ]);
  });

  it('should process TileReleased for each tile it stops working, however it is unregistered, with the tile already free', async (): Promise<void> => {
    const ruleRegistry = new RuleRegistry(),
      registry = new WorkedTileRegistry(ruleRegistry),
      city = await setUpCity('city', ruleRegistry, registry),
      tiles: Tile[] = await Promise.all(
        [1, 2, 3].map((): Promise<Tile> => generateTile(ruleRegistry))
      ),
      workedTiles = tiles.map((tile: Tile) => new WorkedTile(tile, city)),
      released: [City, Tile, boolean][] = [];

    ruleRegistry.register(
      new TileReleased(
        new Effect((city: City, tile: Tile): void => {
          released.push([city, tile, registry.tileIsWorked(tile)]);
        })
      )
    );

    registry.register(...workedTiles);

    registry.unregister(workedTiles[0]);
    registry.unregisterByTile(tiles[1]);
    // Neither is worked any more, so there is nothing to release.
    registry.unregister(workedTiles[0]);
    registry.unregisterByTile(tiles[1]);

    expect(released).to.deep.equal([
      [city, tiles[0], false],
      [city, tiles[1], false],
    ]);
    expect(registry.getByCity(city)).to.deep.equal([workedTiles[2]]);
  });

  it('should not process TileWorked for a worked tile restored from a save, but should release it', async (): Promise<void> => {
    const ruleRegistry = new RuleRegistry(),
      registry = new WorkedTileRegistry(ruleRegistry),
      city = await setUpCity('city', ruleRegistry, registry),
      tile = await generateTile(ruleRegistry),
      // As `hydrate` makes one: the prototype and the saved fields, with no constructor call.
      restored = Object.assign(Object.create(WorkedTile.prototype), {
        _city: city,
        _tile: tile,
      }) as WorkedTile,
      processed: string[] = [];

    ruleRegistry.register(
      new TileWorked(
        new Effect((): void => {
          processed.push('worked');
        })
      ),
      new TileReleased(
        new Effect((): void => {
          processed.push('released');
        })
      )
    );

    registry.register(restored);

    expect(registry.getByTile(tile)).to.equal(restored);
    expect(processed).to.deep.equal([]);

    registry.unregisterByTile(tile);

    expect(processed).to.deep.equal(['released']);
  });
});
