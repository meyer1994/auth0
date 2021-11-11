import store from '@/store'

/**
 * Only allows authenticated users to go forward
 */
export default async (to, from, next) => {
  if (store.state.auth.user === null) {
    return false
  }
  return next()
}
