import cities from './AdditionalData/cities';
import { instance as additionalDataRegistryInstance } from '@civ-clone/core-data-object/AdditionalDataRegistry';
import workedBy from './AdditionalData/worked-by';

additionalDataRegistryInstance.register(...cities(), ...workedBy());
