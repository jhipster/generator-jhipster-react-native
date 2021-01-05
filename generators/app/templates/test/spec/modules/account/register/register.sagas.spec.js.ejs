import { call, put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import { register } from '../../../../../app/modules/account/register/register.sagas';
import RegisterActions from '../../../../../app/modules/account/register/register.reducer';

const stepper = (fn) => (mock) => fn.next(mock).value;

test('register success path', () => {
  const response = FixtureAPI.register({ user: 'user' });
  const step = stepper(register(FixtureAPI, { user: { login: 'user' } }));
  // Call the API with a successful registration
  expect(step({ user: 'user' })).toEqual(call(FixtureAPI.register, { login: 'user', langKey: 'en' }));
  // Finish the saga with success
  expect(step(response)).toEqual(put(RegisterActions.registerSuccess()));
});

test('register failure path', () => {
  const response = FixtureAPI.register({ user: 'user-bad' });
  const step = stepper(register(FixtureAPI, { user: { login: 'user-bad' } }));
  // Call the API with a failing registration
  expect(step({ user: 'user-bad' })).toEqual(call(FixtureAPI.register, { login: 'user-bad', langKey: 'en' }));
  // Finish the saga with failure
  expect(step(response)).toEqual(put(RegisterActions.registerFailure(response.data.title)));
});
