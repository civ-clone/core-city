import Specialist from '../Specialist';
import SpecialistRegistry from '../SpecialistRegistry';
import { expect } from 'chai';
import setUpCity from './lib/setUpCity';

describe('SpecialistRegistry', (): void => {
  it('should return the `Specialist`s of a `City`', async (): Promise<void> => {
    const specialistRegistry = new SpecialistRegistry(),
      city = await setUpCity('city #1'),
      otherCity = await setUpCity('city #2'),
      specialist = new Specialist(city),
      otherSpecialist = new Specialist(otherCity);

    specialistRegistry.register(specialist, otherSpecialist);

    expect(specialistRegistry.getByCity(city)).to.deep.equal([specialist]);
    expect(specialistRegistry.getByCity(otherCity)).to.deep.equal([
      otherSpecialist,
    ]);

    specialistRegistry.unregister(specialist);

    expect(specialistRegistry.getByCity(city)).to.deep.equal([]);
  });
});
