import cities from './AdditionalData/cities';
import { instance as additionalDataRegistryInstance } from '@civ-clone/core-data-object/AdditionalDataRegistry';
import specialists from './AdditionalData/specialists';
import workedBy from './AdditionalData/worked-by';

additionalDataRegistryInstance.register(
  ...cities(),
  ...specialists(),
  ...workedBy()
);
