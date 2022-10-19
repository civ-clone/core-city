import {
  CityRegistry,
  instance as cityRegistryInstance,
} from '../CityRegistry';
import AdditionalData from '@civ-clone/core-data-object/AdditionalData';
import Player from '@civ-clone/core-player/Player';
import Tile from '@civ-clone/core-world/Tile';

export const getAdditionalData = (
  cityRegistry: CityRegistry = cityRegistryInstance
) => [
  new AdditionalData(Player, 'cities', (player: Player) =>
    cityRegistry.getByPlayer(player)
  ),
  new AdditionalData(Tile, 'city', (tile: Tile) =>
    cityRegistry.getByTile(tile)
  ),
];

export default getAdditionalData;
