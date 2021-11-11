<template>
  <h1> Auth0 </h1>
  <hr>
  <h2> I am an insecure route </h2>
  <p><button @click="$router.go(-1)"> Back </button></p>
</template>

<script>
export default {
  name: 'Insecure'
}
</script>
