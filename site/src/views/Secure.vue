<template>
  <h1> Auth0 </h1>
  <hr>
  <h2> I am a secured route </h2>
  <p> Try logging out and accessing it again </p>
  <p><router-link to="/"> Back </router-link></p>
</template>

<script>
export default {
  name: 'Secure'
}
</script>
