<template>
  <div class="nav-container">
    <employee-table-vue />
  </div>
</template>
<script>
import employeeTableVue from "./child/employee-table.vue";
export default {
  components: {
    employeeTableVue,
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
.nav-container {
  width: 100%;
}
</style>
