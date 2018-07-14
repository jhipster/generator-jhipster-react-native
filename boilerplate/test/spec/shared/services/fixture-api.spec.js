import R from 'ramda'

import API from '../../../../app/shared/services/api'
import FixtureAPI from '../../../../app/shared/services/fixture-api'

test('All fixtures map to actual API', () => {
  const fixtureKeys = R.keys(FixtureAPI).sort()
  const apiKeys = R.keys(API.create())
  const intersection = R.intersection(fixtureKeys, apiKeys).sort()

  // There is no difference between the intersection and all fixtures, meaning all fixtures match an API
  expect(R.equals(fixtureKeys, intersection)).toBe(true)
})
