<template>
  <section class="employee-form-container">
    <form id="emp-form" @submit.prevent="saveOrUpdateEmployeeInfo">
      <div class="form-input">
        <input
          name="emp_name"
          type="text"
          id="emp_name"
          placeholder="Employee Name"
          v-model="employeeInfo.empName"
          autocomplete="off"
          :rules="isRequired"
        />
      </div>
      <div class="form-input">
        <input
          name="emp_email"
          type="text"
          id="emp_email"
          placeholder="Email ID"
          v-model="employeeInfo.email"
          autocomplete="off"
          :rules="validateEmail"
        />
      </div>
      <div class="form-input">
        <select id="department" name="department" v-model="employeeInfo.dept">
          <option
            :value="department.id"
            v-for="department in departments"
            :key="department.id"
          >
            {{ department.name }}
          </option>
        </select>
      </div>
      <div class="form-input">
        <p>Languages</p>
        <div class="lang-checkbox">
          <label v-for="language in languages" :key="language.id"
            ><input
              type="checkbox"
              id="check-box"
              :value="language.id"
              v-model="employeeInfo.langs"
            />{{ language.name }}</label
          >
        </div>
      </div>
      <div class="form-input">
        <input
          name="emp_contact"
          type="text"
          id="emp_contact"
          placeholder="Contact No"
          v-model="employeeInfo.contactNo"
          autocomplete="off"
          :rules="isRequired"
        />
      </div>
      <div class="form-buttons">
        <button @click="saveOrUpdateEmployeeInfo">Save</button>
        <button @click="navigateToEmployeeList">Cancel</button>
      </div>
    </form>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      departments: "getDepartments",
      languages: "getAllLanguages",
      employeeInfo: "setEmployeeInfo",
      listOfEmployees: "getAllEmployeeInfo",
    }),
  },
  data() {
    return {
      msg: "Hello world",
    };
  },
  mounted() {
    let empId = this.$route.params.id;
    if (empId) {
      let empData = this.getEmployeeInfoValues();
      let editEmpInfo = empData.find((emp) => emp.empId === +empId);
      editEmpInfo.dept = editEmpInfo.dept.join();
      this.$store.commit("setEditEmployeeInfoDate", editEmpInfo);
    }
  },
  methods: {
    getEmployeeInfoValues() {
      return JSON.parse(sessionStorage.getItem("employeeInfo"));
    },
    saveOrUpdateEmployeeInfo(e) {
      e.preventDefault();
      if (!this.employeeInfo.empId) {
        this.employeeInfo.empId = Date.now();
        this.employeeInfo.dept = this.employeeInfo.dept
          .toString()
          .split(" ")
          .map((id) => +id);
        this.$store.commit("setEmployeeInfo", this.employeeInfo);
        this.navigateToEmployeeList();
      } else {
        let empData = this.getEmployeeInfoValues();
        empData = empData.map((emp) => {
          if (emp.empId === this.employeeInfo.empId) {
            this.employeeInfo.dept = this.employeeInfo.dept
              .toString()
              .split(" ")
              .map((id) => +id);
            emp = this.employeeInfo;
          }
          return { ...emp };
        });
        this.$store.commit("updateEmployeeInfo", empData);
        this.navigateToEmployeeList();
      }
    },
    navigateToEmployeeList() {
      this.$router.push({ name: "EmployeeList" });
      this.$store.commit("setInitialValue", {
        empName: "",
        email: "",
        dept: [],
        langs: [],
        contactNo: "",
        empId: null,
      });
    },
  },
};
</script>
<style scoped>
.employee-form-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin: auto;
}
#emp-form {
  width: 100%;
}
.form-input {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.form-input > * {
  width: 80%;
  margin: 0.8rem 0rem;
  letter-spacing: 1.2px;
}
input[type="text"],
select {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error-text {
  margin: 0;
  color: red;
  font-size: 0.8rem;
}
.lang-checkbox {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
.lang-checkbox > * {
  margin-right: 1rem;
}
label > input[type="checkbox"] {
  margin-right: 0.2rem;
}
.form-buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 1rem;
}
.form-buttons > button {
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
</style>
