import store from '@/store'
import auth0 from '@/auth.api'
import { CALLBACK } from '@/store/type.actions'

/**
 * Adapted from:
 *     https://github.com/auth0-samples/auth0-vue-samples/blob/master/01-Login/src/auth/authWrapper.js#L74
 */
export default async (to, from, next) => {
  console.log('Starting callback guard')

  // Redirected back from auth0
  const hasCode = window.location.search.includes('code=')
  const hasState = window.location.search.includes('state=')

  if (!(hasCode && hasState)) {
    console.log('Does not have `state` or `code` params. Stopping here')
    return false
  }

  console.log('Handling callback from Auth0')
  const { appState: { origin } } = await auth0.handleRedirectCallback()
  await store.dispatch(CALLBACK)

  // Adapted from here
  //    https://github.com/auth0/auth0-spa-js/issues/384#issuecomment-602586642
  window.history.replaceState({}, document.title, window.location.pathname)

  console.log('Forwarding to last origin:', origin)
  return next(origin)
}
