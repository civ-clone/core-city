import {
  DataObject,
  IDataObject,
} from '@civ-clone/core-data-object/DataObject';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import { WorkedTileRegistry } from './WorkedTileRegistry';
import Player from '@civ-clone/core-player/Player';
import Tile from '@civ-clone/core-world/Tile';
import Tileset from '@civ-clone/core-world/Tileset';
import Yield from '@civ-clone/core-yield/Yield';
export interface ICity extends IDataObject {
  capture(player: Player): void;
  destroy(player: Player | null): void;
  destroyed(): boolean;
  name(): string;
  originalPlayer(): Player;
  player(): Player;
  tile(): Tile;
  tiles(): Tileset;
  tilesWorked(): Tileset;
  yields(): Yield[];
}
export declare class City extends DataObject implements ICity {
  static readonly transient: string[];
  private _destroyed;
  private _name;
  private _originalPlayer;
  private _player;
  private _ruleRegistry;
  private _tile;
  private _tiles;
  private _workedTileRegistry;
  constructor(
    player: Player,
    tile: Tile,
    name: string,
    ruleRegistry?: RuleRegistry,
    workedTileRegistry?: WorkedTileRegistry
  );
  capture(capturingPlayer: Player): void;
  destroy(player?: Player | null): void;
  destroyed(): boolean;
  name(): string;
  setName(name: string): void;
  originalPlayer(): Player;
  player(): Player;
  tile(): Tile;
  tiles(): Tileset;
  tilesWorked(): Tileset;
  yields(): Yield[];
  /**
   * Put the `Tileset` back around the restored tiles.
   *
   * `_tiles` is a registry held as a field, and `core-save-game` writes one as
   * an array of its members — the class around a collection is the one thing
   * the format cannot record. So a loaded city arrives with a plain `Tile[]`
   * here and `tiles()` hands back something whose `entries()` is an array
   * iterator.
   *
   * Only the container, deliberately. Recomputing the fat cross from the
   * `Tiles` rule would be smaller in the file and would read the *world* —
   * which may not have rebuilt its own tiles yet, since hooks run in no
   * particular order. A hook that puts its own class back around its own
   * restored state cannot depend on another one.
   */
  onHydrated(): void;
}
export default City;
