import { put, take } from 'redux-saga/effects'

import FixtureAPI from '../../../../app/shared/services/fixture-api'
import { callApi } from '../../../../app/shared/sagas/call-api.saga'
import { getAccount } from '../../../../app/shared/sagas/account.sagas'

const stepper = (fn) => (mock) => fn.next(mock).value

test('returns the response if authorized', () => {
  const apiCall = getAccount(FixtureAPI)
  const step = stepper(callApi(apiCall))
  step()

  const response = FixtureAPI.getAccount()
  expect(step(response)).toEqual(response)
})

test('prompts for login if not authorized, then fails to relogin', () => {
  const apiCall = getAccount(FixtureAPI)
  const step = stepper(callApi(apiCall))
  step()

  const account = {
    ok: true,
    status: 401,
    data: { message: 'Not Authorized' }
  }
  expect(step(account)).toEqual(put({ type: 'RELOGIN' }))
  expect(step()).toEqual(take(['RELOGIN_OK', 'RELOGIN_ABORT']))
  expect(step({ type: 'RELOGIN_ABORT' })).toEqual(account)
  //
})

test('prompts for login if not authorized, then succeeds to relogin', () => {
  const apiCall = getAccount(FixtureAPI)
  const step = stepper(callApi(apiCall))
  step()

  const account = {
    ok: true,
    status: 401,
    data: { message: 'Not Authorized' }
  }
  expect(step(account)).toEqual(put({ type: 'RELOGIN' }))
  expect(step()).toEqual(take(['RELOGIN_OK', 'RELOGIN_ABORT']))
  step({ type: 'RELOGIN_OK' })
})
