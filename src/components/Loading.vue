<template>
    <div class="full">
      <vue-loading v-if="type == 1"
        type="spiningDubbles"
        color="#f3b7b2"
        :size="{ width: '100px', height: '100px' }" />
        <vue-loading v-else-if="type == 2"
        type="bubbles"
        color="#f3b7b2"
        :size="{ width: '165px', height: '165px' }" />
    </div>
    
</template>

<script>
import { VueLoading } from 'vue-loading-template'

export default {
  components: {
    VueLoading
  },
  props: {
    type: { type: Number, default: 1 }
  },
}
</script>
<style>
.full {
  width: 100%;
  height: 100%;
}
</style>