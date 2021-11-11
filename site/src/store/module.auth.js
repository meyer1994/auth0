import auth0 from '@/auth.api'

import { LOGIN, LOGOUT, CALLBACK } from './type.actions'
import { SET_USER, SET_ERROR } from './type.mutations'

const state = {
  user: null,
  error: null
}

const mutations = {
  [SET_USER] (state, user) {
    state.user = user
  },

  [SET_ERROR] (state, error) {
    state.error = error
  }
}

const actions = {
  async [LOGIN] (ctx, state = {}) {
    console.log('Logging in')
    await auth0.loginWithRedirect({ appState: state })
  },

  async [LOGOUT] (ctx) {
    console.log('Purging state')
    ctx.commit(SET_USER, null)
    ctx.commit(SET_ERROR, null)
    console.log('Logging out from Auth0')
    await auth0.logout({ returnTo: 'http://localhost:8000' })
  },

  async [CALLBACK] (ctx) {
    try {
      console.log('Fetching user info from Auth0')
      const user = await auth0.getUser()
      console.log('Updating user state')
      ctx.commit(SET_USER, user)
      ctx.commit(SET_ERROR, null)
    } catch (e) {
      console.error(e)
      console.log('Updating error state')
      ctx.commit(SET_USER, null)
      ctx.commit(SET_ERROR, e)
    }
  }
}

export default {
  state,
  actions,
  mutations
}
