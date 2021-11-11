<template>
  <div>
    <button @click="login"> Login </button>
    <button @click="logout"> Logout </button>
    <br>
    <router-link to="/profile"> Profile </router-link>
  </div>
</template>

<script>
import { LOGIN, LOGOUT } from '@/store/type.actions'

export default {
  name: 'HomeView',

  methods: {
    login () {
      this.$store.dispatch(LOGIN, { origin: this.$route.path })
    },
    logout () {
      this.$store.dispatch(LOGOUT)
    }
  }
}
</script>
