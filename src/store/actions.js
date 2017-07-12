import * as types from './mutation-types'
import {shuffle} from 'common/js/utils'
import {playMode} from 'common/js/config'

function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_FULL_SCREEN, true)
  if (state.mode === playMode.random) {
    commit(types.SET_PLAYLIST, shuffle(list))
    let index = findIndex(shuffle(list), list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_CURRENT_INDEX, index)
}

export const randomPlay = function ({commit, state}, {list}) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAYLIST, shuffle(list))
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_FULL_SCREEN, true)
}
