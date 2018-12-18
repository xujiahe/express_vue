import Vue from 'vue'
import VueI18n from 'vue-i18n'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementCnLocale from 'element-ui/lib/locale/lang/zh-CN'

const defaultLocale = 'CN'

Vue.use(VueI18n)

/**
 * 自动化构建所有的中文语言包
 * 因为 require.context不接受传变量的形式，所有只能写两段冗余的代码。
 */
let lang_cn_modules = {}
const lang_cn = require.context('@/lang/cn', false, /\.js$/);
lang_cn.keys().forEach((fileName) => {
  const file = lang_cn(fileName);
  lang_cn_modules[fileName.match(/(.*\/)*([^.]+).*/)[2]] = file.default || file;
});
/**
 * 自动化构建所有的英文语言包
 */
const lang_en_modules = {}
const lang_en = require.context('@/lang/en', false, /\.js$/);
lang_en.keys().forEach((fileName) => {
  const file = lang_en(fileName);
  lang_en_modules[fileName.match(/(.*\/)*([^.]+).*/)[2]] = file.default || file;
});
const messages = {
  'EN': {
    ...lang_en_modules,
    ...elementEnLocale
  },
  'CN': {
    ...lang_cn_modules,
    ...elementCnLocale
  }
}

const i18n = new VueI18n({
  messages
})

/**
 * 设置默认语言
 * @param {语言} lang 
 */
const setLocale = (lang) => {
  const locale = lang || defaultLocale;
  i18n.locale = locale;
};
setLocale()

export {
  i18n,
  setLocale
}