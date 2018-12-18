<template>
  <div class="error-page">
    <i></i>
    <div class="error-page-text">
      <p>系统发生异常，请稍后重试。</p>如仍然报错，请联系技术支持工程师解决
    </div>
    <el-button type="primary" @click="onSubmit">返回首页</el-button>
  </div>
</template>

<script>
  export default {
    name: "error",
    methods: {
      onSubmit() {
        this.$router.push({
          path: "/",
        });
      }
    }
  }
</script>

<style lang="scss">
  .error-page {
    height: 100%;
    padding: 145px 0 0 0;
    box-sizing: border-box;
    text-align: center;
    background: #E2E6F0;

    i {
      display: inline-block;
      width: 186px;
      height: 145px;
      background: url('../../assets/images/404.png') no-repeat;
    }
  }

  .error-page-text {
    line-height: 40px;
    margin: 15px 0 50px;
    font-size: 18px;
    color: #88969F;

    p {
      font-size: 24px;
    }
  }
</style>