export default {
  // Functions return fixtures

  // entity fixtures
  // ignite-jhipster-api-fixture-needle

  // auth fixtures
  login: () => {
    return {
      ok: true,
      data: require('../Fixtures/login.json')
    }
  },
  register: () => {
    return {
      ok: true
    }
  },
  forgotPassword: () => {
    return {
      ok: true
    }
  },
  getAccount: () => {
    return {
      ok: true,
      data: require('../Fixtures/getAccount.json')
    }
  },
  updateAccount: () => {
    return {
      ok: true
    }
  },
  changePassword: () => {
    return {
      ok: true
    }
  }
}
