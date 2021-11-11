<template>
  <div>
    <button @click="login"> Login </button>
    <button @click="logout"> Logout </button>

    <br>
    <router-link to="/profile"> Profile (requires auth) </router-link>

    <br>
    <button @click="ping"> Ping (no auth) </button>
    <br>
    <pre>{{ pong }}</pre>

    <br>
    <button @click="auth"> Auth (requires auth) </button>
    <br>
    <pre>{{ data }}</pre>

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
