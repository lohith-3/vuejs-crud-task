import { createStore } from "vuex";

export default createStore({
  state: {
    employeeInfo: {
      empName: "",
      email: "",
      dept: [],
      langs: [],
      contactNo: "",
      empId: null,
    },
    listOfEmployees: [],
    departments: [
      {
        id: 1,
        name: "Sales",
      },
      {
        id: 2,
        name: "Marketing",
      },
      {
        id: 3,
        name: "Finance",
      },
    ],
    languages: [
      {
        id: 1,
        name: "Hindi",
      },
      {
        id: 2,
        name: "English",
      },
      {
        id: 3,
        name: "Telugu",
      },
      {
        id: 4,
        name: "Tamil",
      },
    ],
  },
  getters: {
    getDepartments: (state) => state.departments,
    getAllLanguages: (state) => state.languages,
    setEmployeeInfo: (state) => state.employeeInfo,
    getAllEmployeeInfo: (state) => state.listOfEmployees,
  },
  mutations: {
    setEmployeeInfoMockData(state, payload) {
      state.listOfEmployees = payload;
      sessionStorage.setItem(
        "employeeInfo",
        JSON.stringify(state.listOfEmployees)
      );
    },
    setEmployeeInfo(state, payload) {
      let storageData = JSON.parse(sessionStorage.getItem("employeeInfo"));
      if (storageData === null) storageData = [];

      let empData = [...storageData, payload];
      sessionStorage.setItem("employeeInfo", JSON.stringify(empData));

      state.listOfEmployees = empData;
    },
    updateEmployeeInfo(state, payload) {
      let empData = payload;
      sessionStorage.setItem("employeeInfo", JSON.stringify(empData));
      state.listOfEmployees = empData;
    },
    setInitialValue(state, payload) {
      state.employeeInfo = payload;
    },
    setEditEmployeeInfoDate(state, payload) {
      state.employeeInfo = payload;
    },
  },
  actions: {},
  modules: {},
});
