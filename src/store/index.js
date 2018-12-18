import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
/**
 * 自动化构建所有modules里面的store
 */
const modules = {}
const requireModules = require.context('@/store/modules', false, /\.js$/);
requireModules.keys().forEach((fileName) => {
  const file = requireModules(fileName);
  modules[fileName.match(/(.*\/)*([^.]+).*/)[2]] = file.default || file;
});

export default new Vuex.Store({
  modules,
  strict: false,
})