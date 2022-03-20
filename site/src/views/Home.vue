<template>
  <h1> Auth0 </h1>
  <hr>

  <section>
    <h2> Login </h2>
    <p> This secion only shows login/logout interactions directly with Auth0 </p>

    <p><button @click="login"> Login </button></p>
    <p><button @click="logout"> Logout </button></p>

    <p> User logged in: <strong>{{ isLogged ? '✔' : '✖' }}</strong></p>
  </section>

  <section>
    <h2> Profile </h2>
    <p> This sections shows data returned from Auth0 </p>

    <details>
      <summary> User (JSON) </summary>
      <pre>{{ $store.state.auth.user || 'No data' }}</pre>
    </details>
  </section>

  <section>
    <h2> Authenticated routes </h2>
    <p> This section shows use of authenticated routes in Vue </p>

    <p><button @click="$router.push('secure')"> Secured </button></p>
    <p><button @click="$router.push('insecure')"> Not secured </button></p>
  </section>

  <section>
    <h2> Authenticated API </h2>
    <p> This section shows some requests to authenticated API endpoints </p>

    <p><button @click="authenticated"> Authenticated </button></p>
    <p><button @click="unauthenticated"> Unauthenticated </button></p>

    <pre>{{ data ? data : 'No data' }}</pre>
  </section>
</template>

<script>
import auth0 from '@/auth.api'

import { LOGIN, LOGOUT } from '@/store/type.actions'

export default {
  name: 'HomeView',

  data: () => ({
    data: null
  }),

  computed: {
    isLogged () {
      return this.$store.state.auth.user !== null
    }
  },

  methods: {
    login () {
      this.$store.dispatch(LOGIN, { origin: this.$route.path })
    },

    logout () {
      this.$store.dispatch(LOGOUT)
    },

    unauthenticated () {
      console.log('Calling /unauthenticated')
      fetch('/unauthenticated')
        .then(i => i.json())
        .then(i => (this.data = i))
    },

    async authenticated () {
      console.log('Calling /authenticated')
      const token = await auth0.getTokenSilently()
      const headers = { Authorization: `Bearer ${token}` }
      fetch('/authenticated', { headers })
        .then(i => i.json())
        .then(i => (this.data = i))
    }
  }
}
</script>
