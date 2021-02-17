import { instance as additionalDataRegistryInstance } from '@civ-clone/core-data-object/AdditionalDataRegistry';
import cities from './AdditionalData/cities';

additionalDataRegistryInstance.register(...cities());
