<template>
  <div class="logo-wrapper">
    <img v-if="isCollapse" :src="logo" alt="" />
    <span v-if="!isCollapse" class="logo-text">智能客服管理系统</span>
  </div>
</template>
<script>
import logo from "../../../assets/image/logo.png";
export default {
  props: ["isCollapse"],
  setup() {
    return {
      logo
    }
  },
};
</script>
<style scoped>
.logo-wrapper {
  height: 60px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.logo-wrapper img {
  width: 30px;
}
.logo-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #fff;
}
</style>
