<template>
   <transition name="slide">
     <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
   </transition>
</template>

<script>
 import MusicList from 'components/music-list/music-list'
 import {ERR_OK} from 'api/config'
 import {mapGetters} from 'vuex'
 import {getSongList} from 'api/recommend'
 import {createSong} from 'common/js/song'

 export default{
   components: {
     MusicList
   },
   data () {
     return {
       songs: []
     }
   },
   computed: {
     ...mapGetters([
       'desc'
     ]),
     title () {
       return this.desc.dissname
     },
     bgImage () {
       return this.desc.imgurl
     }
   },
   created () {
     this._getSongList()
   },
   methods: {
     _getSongList () {
       if (!this.desc.dissid) {
         this.$router.push('/recommend')
         return
       }
       getSongList(this.desc.dissid).then((res) => {
         if (res.code === ERR_OK) {
           this.songs = this._normalizeSongs(res.cdlist[0].songlist)
         }
       })
     },
     _normalizeSongs (list) {
       let ret = []
       list.forEach((MusicData) => {
         if (MusicData.songid && MusicData.albumid) {
           ret.push(createSong(MusicData))
         }
       })
       return ret
     }
   }
 }
</script>

<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(-100%, 0, 0)
</style>
