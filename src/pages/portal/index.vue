<template>
  <div>
    <Header></Header>
    <Main></Main>
  </div>
</template>
<script>
import Header from "./header";
import Main from "./main";
export default {
  name: "Portal",
  components: {
    Header,
    Main
  }
};
</script>