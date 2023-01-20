import {
  WorkedTileRegistry,
  instance as workedTileRegistryInstance,
} from '../WorkedTileRegistry';
import AdditionalData from '@civ-clone/core-data-object/AdditionalData';
import Tile from '@civ-clone/core-world/Tile';

export const getAdditionalData = (
  workedTileRegistry: WorkedTileRegistry = workedTileRegistryInstance
) => [
  new AdditionalData(
    Tile,
    'workedBy',
    (tile: Tile) => workedTileRegistry.getByTile(tile)?.city() ?? null
  ),
];

export default getAdditionalData;
