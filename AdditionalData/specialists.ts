import {
  SpecialistRegistry,
  instance as specialistRegistryInstance,
} from '../SpecialistRegistry';
import AdditionalData from '@civ-clone/core-data-object/AdditionalData';
import City from '../City';

export const getAdditionalData = (
  specialistRegistry: SpecialistRegistry = specialistRegistryInstance
) => [
  new AdditionalData(City, 'specialists', (city: City) =>
    specialistRegistry.getByCity(city)
  ),
];

export default getAdditionalData;
