import { Auth0Client } from '@auth0/auth0-spa-js'

const redirectUri = process.env.NODE_ENV === 'production'
  ? 'https://meyer1994.github.io/auth0/#/callback'
  : 'http://localhost:8000/#/callback'

const auth0 = new Auth0Client({
  // Defined on Applications section of Auth0
  domain: 'dev-1ymtsnz6.us.auth0.com',
  client_id: '41TAaJZdJzt6Q0bnhBHgEsomhLhDdpSn',
  redirect_uri: redirectUri,

  // Create an API on API section of Auth0
  audience: 'https://localhost:8080'
})

window.auth0 = auth0
export default auth0
