import EntityRegistry, {
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';
import City from './City';
import Specialist from './Specialist';

export interface ISpecialistRegistry extends IEntityRegistry<Specialist> {
  getByCity(city: City): Specialist[];
}

export class SpecialistRegistry
  extends EntityRegistry<Specialist>
  implements ISpecialistRegistry
{
  constructor() {
    super(Specialist);
  }

  getByCity(city: City): Specialist[] {
    return this.getBy('city', city);
  }
}

export const instance = new SpecialistRegistry();

export default SpecialistRegistry;
