<template>
  <div class="m-header">
     <div class="icon"></div>
     <h1 class="text">Chicken Music</h1>
  </div>
</template>

<script type="text/javascript">
  export default{

  }
</script>

<style lang="stylus" scoped>
 @import '~common/stylus/mixin'
 @import '~common/stylus/variable'

  .m-header
    position: relative
    height: 44px
    text-align: center
    color: $color-theme
    font-size: 0
    .icon
      display: inline-block
      vertical-align: top
      margin: 6px 9px 0 0
      width: 30px
      height: 32px
      bg-image('logo')
      background-size: 30px 32px
    .text
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $font-size-large
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-mine
        display: block
        padding: 12px
        font-size: 20px
        color: $color-theme
</style>
