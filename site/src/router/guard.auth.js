import store from '@/store'

/**
 * Only allows authenticated users to go forward
 */
export default async (to) => {
  if (store.state.auth.user === null) {
    console.log('User not logged in. Declining:', to)
    return false
  }

  console.log('User logged in. Accepting:', to)
  return true
}
