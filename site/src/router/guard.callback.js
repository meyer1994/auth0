import store from '@/store'
import auth0 from '@/auth.api'
import { CALLBACK } from '@/store/type.actions'

/**
 * Adapted from:
 *     https://github.com/auth0-samples/auth0-vue-samples/blob/master/01-Login/src/auth/authWrapper.js#L74
 */
export default async (to, from, next) => {
  // Redirected back from auth0
  const hasCode = window.location.search.includes('code=')
  const hasState = window.location.search.includes('state=')

  if (!(hasCode && hasState)) {
    return false
  }

  const { appState: { origin } } = await auth0.handleRedirectCallback()
  await store.dispatch(CALLBACK)

  // Adapted from here
  //    https://github.com/auth0/auth0-spa-js/issues/384#issuecomment-602586642
  window.history.replaceState({}, document.title, window.location.pathname)

  return next(origin)
}
