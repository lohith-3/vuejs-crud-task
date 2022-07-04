import { createRouter, createWebHistory } from "vue-router";
import EmployeeList from "../components/Employee/employees-list.vue";
import EmployeeCreateEdit from "../components/Employee/child/employee-create-edit.vue";

const routes = [
  {
    path: "/",
    name: "EmployeeList",
    component: EmployeeList,
  },
  {
    path: "/employee/:id?",
    name: "EmployeeCreateEdit",
    component: EmployeeCreateEdit,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
