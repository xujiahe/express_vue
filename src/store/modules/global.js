import {
  setStore,
  getStore
} from "@/utils/localStorage";
import { setLocale } from '@/lang' // 国际化
const state = {
  language: getStore('language') || 'CN', //用户信息
}

// mutations
const mutations = {
  SET_LANGUAGE: (state, language) => {
    state.language = language
    setLocale(language)
    setStore('language', language)
  },
}
const actions = {
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}