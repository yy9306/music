<template>
  <div id="app">
     <m-header></m-header>
     <tab></tab>
     <keep-alive>
       <router-view></router-view>
     </keep-alive>
     <player></player>
  </div>
</template>

<script>
import mHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
import Player from 'components/player/player'

export default {
  name: 'app',
  components: {
    mHeader, Tab, Player
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"


</style>
