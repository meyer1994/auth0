<template>
  <div>
    <router-link to="/"> Home </router-link>
    <pre> {{ $store.state.auth }} </pre>
  </div>
</template>

<script>

export default {
  name: 'ProfileView'
}
</script>
