<template>
   <div class="music-list">
      <div class="back" @click="back">
         <i class="icon-back"></i>
      </div>
      <h1 class="title">{{title}}</h1>
      <div class="bg-image" :style="bgStyle" ref="Img">
        <div class="play-wrapper" v-if="songs.length" ref="playWrapper">
           <div class="play" @click="random">
               <i class="icon-play"></i>
               <span class="text">随机播放全部</span>
           </div>
        </div>
         <div class="filter"></div>
      </div>
      <div class="bg-layer" ref="layer"></div>
      <scroll class="list" :data="songs" ref="list" :probe-type="probeType" :listScroll="listScroll" @scroll="scroll">
         <div class="song-list-wrapper">
           <song-list :songs="songs" @select="selectItem" :rank="rank"></song-list>
         </div>
         <div class="loading-container">
             <loading v-if="!songs.length"></loading>
         </div>
      </scroll>
   </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'
import {prefixStyle} from 'common/js/dom'
import Loading from 'base/loading/loading'
import {mapActions} from 'vuex'
import {playlistMixin} from 'common/js/mixin'

const RESERVE_HEIGHT = 40
const transform = prefixStyle('transform')
const backdrop = prefixStyle('backdrop-filter')
export default{
  mixins: [playlistMixin],
  components: {
    Scroll, SongList, Loading
  },
  data () {
    return {
      scrollY: 0
    }
  },
  created () {
    this.probeType = 3
    this.listScroll = true
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: []
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.list.$el.style.bottom = bottom
      this.$refs.list.refresh()
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    back () {
      this.$router.back()
    },
    random () {
      this.randomPlay({
        list: this.songs
      })
    },
    selectItem (song, index) {
      this.selectPlay({
        'list': this.songs,
        'index': index
      })
    },
    ...mapActions([
      'selectPlay',
      'randomPlay'
    ])
  },
  mounted () {
    this.imgHeight = this.$refs.Img.clientHeight
    this.minTranslateY = -this.imgHeight + RESERVE_HEIGHT
    this.$refs.list.$el.style.top = `${this.$refs.Img.clientHeight}px`
  },
  computed: {
    bgStyle () {
      return `background-image:url(${this.bgImage})`
    }
  },
  watch: {
    scrollY (newY) {
      let maxHeight = Math.max(this.minTranslateY, newY)
      let zIndex = 0
      let scale = 1
      let blur = 0
      let percent = Math.abs(newY / this.minTranslateY)
      this.$refs.layer.style[transform] = `translate3d(0, ${maxHeight}px, 0)`
      if (newY > 0) {
        zIndex = 20
        scale = 1 + percent
      } else {
        blur = Math.min(20 * percent, 20)
      }
      if (newY < this.minTranslateY) {
        zIndex = 20
        this.$refs.Img.style.paddingTop = 0
        this.$refs.Img.style.height = `${RESERVE_HEIGHT}px`
        this.$refs.playWrapper.style.display = 'none'
      } else {
        this.$refs.Img.style.paddingTop = '70%'
        this.$refs.Img.style.height = 0
        this.$refs.playWrapper.style.display = ' '
      }
      this.$refs.Img.style.zIndex = `${zIndex}`
      this.$refs.Img.style[transform] = `scale(${scale})`
      this.$refs.Img.style[backdrop] = `blur(${blur})`
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
@import "~common/stylus/mixin"

.music-list
  position: fixed
  z-index: 100
  top: 0
  left: 0
  bottom: 0
  right: 0
  background: $color-background
  .back
    position: absolute
    top: 0
    left: 6px
    z-index: 50
    .icon-back
      display: block
      padding: 10px
      font-size: $font-size-large-x
      color: $color-theme
  .title
    position: absolute
    top: 0
    left: 10%;
    z-index: 40
    width: 80%
    no-wrap()
    text-align: center
    line-height: 40px
    font-size: $font-size-large
    color: $color-text
  .bg-image
    position: relative
    width: 100%
    height: 0
    padding-top: 70%
    transform-origin: top
    background-size: cover
    .play-wrapper
      position: absolute
      bottom: 20px
      z-index: 50
      width: 100%
      .play
        box-sizing: border-box
        width: 135px
        padding: 7px 0
        margin: 0 auto
        text-align: center
        border: 1px solid $color-theme
        color: $color-theme
        border-radius: 100px
        font-size: 0
        .icon-play
          display: inline-block
          vertical-align: middle
          margin-right: 6px
          font-size: $font-size-medium-x
        .text
          display: inline-block
          vertical-align: middle
          font-size: $font-size-small
    .filter
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      background: rgba(7, 17, 27, 0.4)
  .bg-layer
    position: relative
    height: 100%
    background: $color-background
  .list
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    background: $color-background
    .song-list-wrapper
      padding: 20px 30px
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)

</style>
