<template>
  <section class="table-container">
    <div class="add-btn">
      <button @click="createEmployee()">Add</button>
    </div>
    <table>
      <tr>
        <th>Emp. Name</th>
        <th>Email ID</th>
        <th>Department</th>
        <th>Languages</th>
        <th>Contact No</th>
        <th>Actions</th>
      </tr>
      <tr v-for="employee in listOfEmployees" :key="employee.empId">
        <td>{{ employee.empName }}</td>
        <td>{{ employee.email }}</td>
        <td>{{ getEmployeeDept(employee.dept) }}</td>
        <td>{{ getEmployeeLang(employee.langs) }}</td>
        <td>{{ employee.contactNo }}</td>
        <td class="action-icons">
          <font-awesome-icon
            @click="editEmpRecord(employee.empId)"
            icon="pen-to-square"
          />
          <font-awesome-icon
            v-bind:class="{
              'fa-disabled': enableIcon(),
            }"
            @click="deleteEmpRecord(employee.empId)"
            icon="trash-can"
          />
        </td>
      </tr>
    </table>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      listOfEmployees: "getAllEmployeeInfo",
      departments: "getDepartments",
      languages: "getAllLanguages",
    }),
  },
  data() {
    return {};
  },
  methods: {
    enableIcon() {
      let empData = JSON.parse(sessionStorage.getItem("employeeInfo"));
      if (empData.length === 1 && empData !== null) {
        return true;
      }
      return false;
    },
    createEmployee() {
      this.$router.push({ name: "EmployeeCreateEdit" });
      this.$store.commit("setInitialValue", {
        empName: "",
        email: "",
        dept: [],
        langs: [],
        contactNo: "",
        empId: null,
      });
    },
    getEmployeeLang(langId) {
      if (langId.length <= 0) {
        return "";
      }
      let language = this.getEmployeeDeptOrLangValue(langId, this.languages);
      return language;
    },
    getEmployeeDept(deptId) {
      if (deptId.length <= 0) {
        return "";
      }
      let department = this.getEmployeeDeptOrLangValue(
        deptId,
        this.departments
      );
      return department;
    },
    getEmployeeDeptOrLangValue(id, empDetails) {
      let result;
      result = empDetails.filter((dept) => id.includes(dept.id));
      result = result.map((dept) => dept.name).join(",");
      return result;
    },
    editEmpRecord(empId) {
      if (empId) {
        this.$router.push({
          name: "EmployeeCreateEdit",
          params: { id: empId },
        });
      }
    },
    deleteEmpRecord(empId) {
      if (empId) {
        let empData = JSON.parse(sessionStorage.getItem("employeeInfo"));
        let filteredEmpData = empData.filter((emp) => emp.empId !== empId);
        this.$store.commit("updateEmployeeInfo", filteredEmpData);
      }
    },
  },
};
</script>
<style scoped>
.fa-disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}
.table-container {
  overflow-x: auto;
  height: 80vh;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  width: 80%;
  margin: auto;
}
.add-btn {
  align-self: flex-end;
}
.add-btn > button {
  background-color: hsl(205, 78%, 60%);
  border: none;
  color: white;
  padding: 0.8rem 1.5rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
  letter-spacing: 1.2px;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
}

th,
td {
  text-align: center;
  padding: 1.5rem 0.5rem;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
th {
  background-color: hsl(205, 78%, 60%);
  color: #fff;
  letter-spacing: 1px;
  font-size: 1rem;
}
td.action-icons {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
}
td.action-icons > * {
  font-size: 1rem;
  cursor: pointer;
}
@media (max-width: 650px) {
  .add-btn {
    align-self: flex-start;
  }
}
</style>
