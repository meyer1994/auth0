import { Auth0Client } from '@auth0/auth0-spa-js'

const auth0 = new Auth0Client({
  domain: 'dev-1ymtsnz6.us.auth0.com', // Get this on Auth0's site
  client_id: '41TAaJZdJzt6Q0bnhBHgEsomhLhDdpSn', // Get this on Auth0's site
  redirect_uri: 'http://localhost:8080/#/callback' // Configure on Auth0's site
})

window.auth0 = auth0
export default auth0
