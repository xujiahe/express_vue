<template>
  <main>
    <div>get请求返回结果：{{info}}</div>
    <el-row>
      <el-radio-group v-model="language" @change="changeLanguage">
        <el-radio label="CN">中文</el-radio>
        <el-radio label="EN">英文</el-radio>
      </el-radio-group>
    </el-row>
    <div></div>
    <el-row>
      <el-radio-group v-model="voiceType">
        <el-radio v-for="item in voiceStatus" :key="item.value" :label="item.value">{{item.label}}</el-radio>
      </el-radio-group>
    </el-row>
  </main>
</template>
<script>
  import system from "@/service/system";
  import { mapActions } from "vuex";
  export default {
    name: "Main",
    data() {
      return {
        info: {},
        language: "CN",
        voiceType: "",
        voice: ""
      };
    },
    computed: {
      voiceStatus() {
        return this.$t("constant.voiceState");
      }
    },
    created() {
      system.getParams().then(result => {
        this.info = result.data;
      });
      this.voice = this.$t("constant.voiceState");
    },
    methods: {
      ...mapActions("global", ["setLanguage"]),
      changeLanguage(lang) {
        this.setLanguage(lang);
      }
    }
  };
</script>