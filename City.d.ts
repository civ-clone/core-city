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
  #private;
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
}
export default City;
