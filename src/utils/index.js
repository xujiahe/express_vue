/**
 * 精简版去抖
 * @param {执行的函数} fn 
 * @param {延迟时间} delay 
 */
export const debounce = (fn, delay) => {
  let args = arguments,
    context = this,
    timer = null;
  return function() {
    if (timer) {
      clearTimeout(timer);

      timer = setTimeout(function() {
        fn.apply(context, args);
      }, delay);
    } else {
      timer = setTimeout(function() {
        fn.apply(context, args);
      }, delay);
    }
  }
};

/**
 * obj数据join方法
 * @param {Object} data 
 * @param {String} key 
 * @param {String} str 
 */
export const objJoin = (data, key, str) => {
  return this.objArrToArr(data, key).join(str);
}

/**
 * obj转数据
 * @param {Object} data 
 * @param {String} key 
 */
export const objArrToArr = (data, key) => {
  let arr = [];
  for (let i = 0; i < data.length; i++) {
    arr.push(data[i][key].toString());
  }
  return arr;
}

/**
 * 通过obj数组的一个key的值获取另一个key 的值
 * @param {obj数组} data 
 * @param {String} key 
 * @param {值} value 
 * @param {String} newKey 
 */
export const getValByKeyAndVal = (data, key, value, newKey) => {
  for (let att of data) {
    if (att[key] === value) {
      return att[newKey];
    }
  }
}

/**
 * 通过obj数组的一个key的值获取obj
 * @param {obj数组} data 
 * @param {String} key 
 * @param {值} value 
 */
export const getObjByKeyAndVal = (data, key, value) => {
  for (let att of data) {
    if (att[key] === value) {
      return att;
    }
  }
}

/**
 * select选择，通过value获取label
 * @param {obj数组} data 
 * @param {值} value 
 */
export const getLabelByValue = (data, value) => {
  return this.getValByKeyAndVal(data, "value", value, 'label')
}