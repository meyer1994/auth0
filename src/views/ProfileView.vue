<template>
  <div class="home">
    {{ $store.state.auth }}
  </div>
</template>

<script>
import AuthMixin from '@/mixins/auth.mixin'

export default {
  name: 'ProfileView',
  mixins: [AuthMixin]
}
</script>
