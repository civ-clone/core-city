import {
  CityRegistry,
  instance as cityRegistryInstance,
} from '../CityRegistry';
import AdditionalData from '@civ-clone/core-data-object/AdditionalData';
import Player from '@civ-clone/core-player/Player';

export const getAdditionalData = (
  cityRegistry: CityRegistry = cityRegistryInstance
) => [
  new AdditionalData(Player, 'cities', (player: Player) =>
    cityRegistry.getByPlayer(player)
  ),
];

export default getAdditionalData;
