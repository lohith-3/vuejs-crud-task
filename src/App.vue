<template>
  <nav class="main-nav">
    <ul class="main-nav__lists">
      <li class="main-nav__list">
        <router-link to="/"><font-awesome-icon icon="home" /></router-link>
      </li>
      <li class="main-nav__list" v-if="enableOnCreateEdit">
        <font-awesome-icon icon="angle-right" />
      </li>
      <li class="main-nav__list" v-if="enableOnCreateEdit">
        <a href="#">{{ $route.params.id ? "Edit" : "Add" }}</a>
      </li>
    </ul>
  </nav>
  <router-view />
</template>
<script>
export default {
  computed: {
    enableOnCreateEdit() {
      const routeName = this.$route.name ? this.$route.name.toLowerCase() : "";
      if (routeName) {
        return routeName.toLowerCase() === "EmployeeCreateEdit".toLowerCase();
      }
      return false;
    },
  },
  data() {
    return {};
  },
  created() {
    let empData = JSON.parse(sessionStorage.getItem("employeeInfo"));
    if (empData?.length <= 0 || empData === null) {
      let mockEmpData = {
        empName: "Shankar",
        email: "shankar123@gmail.com",
        dept: [1],
        langs: [2],
        contactNo: "1234567890",
        empId: Date.now(),
      };
      this.$store.commit("setEmployeeInfoMockData", [mockEmpData]);
    } else {
      this.$store.commit("setEmployeeInfoMockData", empData);
    }
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: hsl(210, 36%, 96%);
  font-family: "Open Sans", sans-serif;
}
.main-nav {
  width: 100%;
  background-color: #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 1rem 1.5rem;
  position: fixed;
  top: 0;
  left: 0;
}
.main-nav__lists {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  list-style-type: none;
}
.main-nav__list {
  margin: 1rem 0.5rem;
}
.main-nav__list > * {
  font-size: 1.3rem;
  letter-spacing: 1px;
}
.main-nav__list a {
  text-decoration: none;
  color: black;
}
</style>
