<template>
  <div class="search-list">
     <ul>
       <li class="search-item" v-for="item in searches" @click="selectItem(item)">
         <span class="text">{{item}}</span>
         <span class="icon">
           <i class="icon-delete" @click.stop="deleteOne(item)"></i>
         </span>
       </li>
     </ul>
  </div>
</template>

<script>
export default{
  props: {
    searches: {
      type: Array,
      default: []
    }
  },
  methods: {
    selectItem (query) {
      this.$emit('select', query)
    },
    deleteOne (item) {
      this.$emit('deleteOne', item)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"

.search-list
  .search-item
    display: flex
    align-items: center
    height: 40px
    &.list-enter-active,&.list-leave-active
      transition: all 0.4s
    &.list-enter,&.list-leave-to
      opacity: 0
      height: 0
    .text
      flex: 1
      color: $color-text-l
    .icon
      extend-click()
      .icon-delete
        font-size: $font-size-small
        color: $color-text-d
</style>
