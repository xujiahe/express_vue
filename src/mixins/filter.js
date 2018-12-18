export default {
  methods: {
    validAlphaNum(val) { // 这里过滤的是除了英文字母和数字的其他字符
      return val.replace(/[^A-z0-9]/, '')
    },
    validNumeric(val) { //数字
      return val.replace(/^[0-9]*$/, '')
    },
    /**
     * 校验手机号
     */
    validTelephone: (rule, value, callback) => {
      if (value.length > 0 && !/^1[123456789]\d{9}$/.test(value)) {
        callback(new Error("请输入11位数字的手机号!"));
      } else {
        callback();
      }
    },
    /**
     * 校验普通名称 2-15位
     */
    validNormalName: (rule, value, callback) => {
      if (!(/^.{2,15}$/.test(value))) {
        callback(new Error('请输入2-15位数字、字母、符号'));
      } else {
        callback();
      }
    },
    /**
     * 校验登录名称2-15位,数字字母
     */
    validLoginName: (rule, value, callback) => {
      if (!(/^[A-z0-9]{2,15}$/.test(value))) {
        callback(new Error('请输入2-15位数字、字母'));
      } else {
        callback();
      }
    },
    /**
     * 纯数字，2-15位
     */
    validNumericNum: (rule, value, callback) => {
      if (!(/^[0-9]{2,15}$/.test(value))) {
        callback(new Error('请输入2-15位数字'));
      } else {
        callback();
      }
    },
    /**
     * 校验身份证证件号
     */
    validIdcard: (rule, value, callback) => {
      if (!/^[0-9a-zA-Z]{15}$|^[0-9a-zA-Z]{18}$/.test(value)) {
        callback(new Error('请输入15位或18位数字、字母'));
      } else {
        callback();
      }
    },
    /**
     * 校验证件号
     */
    validCards: (rule, value, callback) => {
      if (value.length > 0 && !(/^[A-z0-9]{2,20}$/.test(value))) {
        callback(new Error('请输入2-20位数字、字母'));
      } else {
        callback();
      }
    }
  }
};