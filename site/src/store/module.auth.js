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
    await auth0.loginWithRedirect({ appState: state })
  },

  async [LOGOUT] (ctx) {
    ctx.commit(SET_USER, null)
    ctx.commit(SET_ERROR, null)
    await auth0.logout()
  },

  async [CALLBACK] (ctx) {
    try {
      const user = await auth0.getUser()
      ctx.commit(SET_USER, user)
      ctx.commit(SET_ERROR, null)
    } catch (e) {
      console.error(e)
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
