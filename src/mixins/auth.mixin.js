import store from '@/store'

import { LOGIN } from '@/store/actions.type'

/**
 * Used to easily apply authentication logic to
 * views
 */
export default {
  async beforeRouteEnter (to, from, next) {
    if (store.state.auth.auth) {
      return next()
    }
    const state = { to: to.path }
    store.dispatch(LOGIN, state)
  }
}
