<template>
  <suspense>
    <template #default>
      <app-main-index></app-main-index>
    </template>
    <template #fallback>
      <div style='height:100%;width:100%;margin-top: 30%;'>
        <a-spin size="large" tip='加载数据中'/>
      </div>
    </template>
  </suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppMainIndex from './app-main-index/AppMainIndex.vue'

export default defineComponent({
  name: 'app-main',
  components: {
    AppMainIndex
  },
  setup () {
    return {
    }
  }
})
</script>
