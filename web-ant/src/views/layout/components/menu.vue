<template>
  <div class="menu-wrapper">
    <el-menu
      :default-active="$store.state.sidebarMenuActiveName"
      :collapse="$store.state.sidebarFold"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item>
        <pie-chart-outlined />
        <span>仪表盘</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  props: ["isCollapse"],
  setup() {
    return {};
  },
};
</script>
<style scoped>
.menu-wrapper {
  height: calc(100vh - 60px);
}
</style>
