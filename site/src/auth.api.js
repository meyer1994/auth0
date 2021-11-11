import { Auth0Client } from '@auth0/auth0-spa-js'

export default new Auth0Client({
  domain: 'dev-1ymtsnz6.us.auth0.com',
  client_id: '41TAaJZdJzt6Q0bnhBHgEsomhLhDdpSn',
  redirect_uri: 'http://localhost:8080/#/callback'
})
