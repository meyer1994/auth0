import store from '@/store'

import { CHECK_AUTH } from '@/store/actions.type'

/**
 * Checks for credentials on every route
 */
export default (to, from, next) => {
  store.dispatch(CHECK_AUTH).then(next)
}
