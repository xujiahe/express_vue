import {
  on
} from '@/utils/dom';

export default {
  bind(el, binding, vnode) {
    let timer = null;
    let startTime = 0;
    const handler = () => vnode.context[binding.expression].apply();

    on(el, 'click', (e) => {
      if (e.button !== 0) return;
      if (new Date() - startTime < 1000) { //如果时间间隔小于1000毫秒则默认抛弃改动作
        clearTimeout(timer);
        timer = null;
        return;
      }
      startTime = new Date();
      timer = setTimeout(handler, 50); //50毫秒之后触发
    });
  }
};