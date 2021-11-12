<template>
  <div class="header-wrapper">
    <span
      ><el-icon @click="$store.state.sidebarFold = !$store.state.sidebarFold"><Fold /></el-icon
    ></span>
    <span>Tom</span>
  </div>
</template>

<script>
import { Fold } from "@element-plus/icons";
export default {
  components: {
    Fold,
  },
  setup() {

  },
};
</script>

<style scoped>
.header-wrapper {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-icon-s-fold,
.el-icon-s-unfold {
  cursor: pointer;
  font-size: 30px;
  padding: 15px;
}
</style>
