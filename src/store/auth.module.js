import auth0 from '@/commons/auth.api'

import { LOGIN, CHECK_AUTH } from './actions.type'
import { SET_USER, SET_AUTH, SET_ERROR } from './mutations.type'

const state = {
  user: {},
  error: {},
  auth: false
}

const mutations = {
  [SET_USER] (state, user) {
    state.user = user
  },
  [SET_AUTH] (state, auth) {
    state.auth = auth
  },
  [SET_ERROR] (state, error) {
    state.error = error
  }
}

const actions = {
  async [CHECK_AUTH] (ctx) {
    let state = {}

    // Redirected back from auth0
    const hasCode = window.location.search.includes('code=')
    const hasState = window.location.search.includes('state=')
    if (hasCode && hasState) {
      const { appState } = await auth0.handleRedirectCallback()
      state = appState
      // Adapted from here
      //    https://github.com/auth0/auth0-spa-js/issues/384#issuecomment-602586642
      window.history.replaceState({}, document.title, window.location.pathname)
    }

    // Try logging in
    try {
      await auth0.getTokenSilently()
      const user = await auth0.getUser()
      ctx.commit(SET_USER, user)
      ctx.commit(SET_AUTH, true)
    } catch (e) {
      ctx.commit(SET_ERROR, e)
      ctx.commit(SET_AUTH, false)
    }

    return state
  },
  async [LOGIN] (ctx, state = {}) {
    await auth0.loginWithRedirect({ appState: state })
  }
}

export default {
  state,
  actions,
  mutations
}
