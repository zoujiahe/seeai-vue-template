<template>
  <router-view/>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { win } from '@/common/base'
import { LocalStorageUtil, ToolsUtil } from '@/common/utils'
import { CommonApi } from '@/app/api'

declare const window: win
export default defineComponent({
  name: 'app',
  setup () {
    ToolsUtil.initTheme()
    window.__platform__ = 'platform-scholar'
    CommonApi.getInfo().then((res) => {
      if (res.data.status === 200) {
        LocalStorageUtil.putOrgInfo(res.data.data)
        LocalStorageUtil.putSchoolName(res.data.data.orgName)
      }
    })
    return {}
  }
})

</script>
<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
