<template>
  <div class="recommend">
    <scroll class="recommend-content" :data="disclist" ref="scroll">
      <div>
        <div class="slider-wrapper" v-if="recommends.length">
          <slider>
            <div v-for="item in recommends" ref="wrapper">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" alt="" @load="loadImage" class="needsclick">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
           <h1 class="list-title">热门推荐歌单</h1>
           <ul>
             <li class="item" v-for="item in disclist">
               <div class="icon">
                  <img v-lazy="item.imgurl" alt="" width="60" height="60">
               </div>
               <div class="text">
                  <h2 class="name">{{item.creator.name}}</h2>
                  <p class="desc">{{item.dissname}}</p>
               </div>
             </li>
           </ul>
        </div>
      </div>
      <div class="loading-container" v-if="!disclist.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
  import {getRecommend, getDislist} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import Slider from 'base/slider/slider'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  export default{
    components: {
      Slider, Scroll, Loading
    },
    created () {
      this._getRecommend()
      this._getDislist()
    },
    data () {
      return {
        recommends: [],
        disclist: []
      }
    },
    methods: {
      loadImage () {
        if (!this.checkLoaded) {
          this.checkLoaded = true
          this.$refs.scroll.refresh()
        }
      },
      _getRecommend () {
        getRecommend().then(res => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
          }
        })
      },
      _getDislist () {
        getDislist().then((res) => {
          if (res.code === ERR_OK) {
            this.disclist = res.data.list
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
 .recommend
   position: fixed
   width: 100%
   top: 88px
   bottom: 0
   .recommend-content
     height: 100%
     overflow: hidden
     .slider-wrapper
       position: relative
       width: 100%
       overflow: hidden
     .recommend-list
       .list-title
         height: 65px
         line-height: 65px
         text-align: center
         font-size: $font-size-medium
         color: $color-theme
       .item
         display: flex
         box-sizing: border-box
         align-items: center
         padding: 0 20px 20px 20px
         .icon
           flex: 0 0 60px
           width: 60
           padding-right: 20px
         .text
           display: flex
           flex-direction: column
           justify-content: center
           flex: 1
           line-height: 20px
           overflow: hidden
           font-size: $font-size-medium
           .name
             margin-bottom: 10px
             color: $color-text
           .desc
             color: $color-text-d
     .loading-container
       position: absolute
       width: 100%
       top: 50%
       transform: translateY(-50%)

</style>
