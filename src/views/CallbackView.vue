<template>
  <div></div>
</template>
<script>
import { CHECK_AUTH } from '@/store/actions.type'

/**
 * This component just contains the callback logic
 */
export default {
  async beforeCreate () {
    const { to } = await this.$store.dispatch(CHECK_AUTH)
    if (to) {
      this.$router.replace(to)
    }
  }
}
</script>
