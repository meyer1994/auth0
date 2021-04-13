<template>
  <div class="home">
    <router-link to="/"> Home </router-link>
    <p> {{ $store.state.auth }} </p>
  </div>
</template>

<script>

export default {
  name: 'ProfileView'
}
</script>
