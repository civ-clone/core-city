import EntityRegistry, {
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';
import City from './City';
import Specialist from './Specialist';
export interface ISpecialistRegistry extends IEntityRegistry<Specialist> {
  getByCity(city: City): Specialist[];
}
export declare class SpecialistRegistry
  extends EntityRegistry<Specialist>
  implements ISpecialistRegistry
{
  constructor();
  getByCity(city: City): Specialist[];
}
export declare const instance: SpecialistRegistry;
export default SpecialistRegistry;
