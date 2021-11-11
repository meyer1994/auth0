<template>
<div>
  <h1> Auth0 </h1>
  <hr>

  <section>
    <h2> Login </h2>
    <p> This secion only shows login/logout interactions directly with Auth0 </p>

    <p>
      <button @click="login"> Login </button>
      <button @click="logout"> Logout </button>
    </p>

    <p> User logged in: <strong> {{ isLogged ? '✔' : '✖' }} </strong></p>
  </section>

  <section>
    <h2> Profile </h2>
    <p> This sections shows data returned from Auth0 </p>

    <details>
      <summary> User (JSON) </summary>
      <pre> {{ $store.state.auth.user || 'No data' }} </pre>
    </details>

    <details>
      <summary> Error (JSON) </summary>
      <pre> {{ $store.state.auth.error || 'No error' }} </pre>
    </details>
  </section>

  <section>
    <h2> Authenticated routes </h2>
    <p> This section shows use of authenticated routes in Vue </p>

    <p><router-link to="secure"> Secured </router-link></p>
    <p><router-link to="insecure"> Not secured </router-link></p>
  </section>
</div>
</template>

<script>
import axios from 'axios'

import auth0 from '@/auth.api'

import { LOGIN, LOGOUT } from '@/store/type.actions'

export default {
  name: 'HomeView',

  data: () => ({
    pong: null,
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
    async ping () {
      console.log('Calling /ping')
      this.pong = await axios.get('http://localhost:8080/ping')
    },
    async auth () {
      console.log('Calling /auth')
      const token = await auth0.getTokenSilently()
      console.log(token)
      this.data = await axios.get('http://localhost:8080/auth', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }
  }
}
</script>
