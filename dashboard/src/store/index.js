import Vue from "vue";
import Vuex from "vuex";
import * as fb from "../firebase";
import router from "../router/index";
import swal from "sweetalert";
const axios = require("axios").default;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userProfile: {},
    clients: [],
    employees: [],
    calendars: [],
    loading: false,
    currentClient: {},
    payrunEmployees: [],
    designations: [],
    error: "",
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setCurrentClient(state, val) {
      state.currentClient = val;
    },
    setClients(state, val) {
      state.clients = val;
    },
    setEmployees(state, val) {
      state.employees = val;
    },
    setCalendars(state, val) {
      state.calendars = val;
    },
    setLoading(state, val) {
      state.loading = val;
    },
    setpayrunEmployees(state, val) {
      state.payrunEmployees = val;
    },
    setError(state, val) {
      state.error = val;
    },
    setDeductions(state, val) {
      state.designations = val;
    },
  },
  actions: {
    /**
     * Profile Section Starts Here
     */
    async signup() {
      try {
      } catch (error) {}
    },

    async login({ dispatch }, newUser) {
      try {
        const { user } = await fb.auth.signInWithEmailAndPassword(
          newUser.email,
          newUser.password
        );
        router.push("/dashboard");
        dispatch("fetchUserProfile", user);
      } catch (err) {
        swal({
          title: "OOPS!",
          text: `${err}`,
          icon: "error",
        });
      }
    },
    async logout() {
      await fb.auth.signOut().then(() => {
        localStorage.clear();
        router.replace({ path: "/sign-in" });
      });
    },
    async updatePassword({ dispatch }, password) {
      const user = fb.auth.currentUser;
      await user
        .updatePassword(password)
        .then(() => {
          swal({
            title: "SUCCESS!",
            text: `Password updated successfully`,
            icon: "success",
          });
        })
        .catch((err) => {
          swal({
            title: "OOPs!",
            text: `${err.message}`,
            icon: "error",
          });
        });
    },
    updateUser() {
      const user = fb.auth.currentUser;
    },
    async resetPassword({ dispatch }, email) {
      const reset = await fb.auth
        .sendPasswordResetEmail(email)
        .then(() => {
          swal({
            title: "SUCCESS!",
            text: "the password reset link has been sent to your email",
            icon: "success",
          });
        })
        .catch((err) => {
          swal({
            title: "OOPS!",
            text: `${err}`,
            icon: "error",
          });
        });
      this.state.error = "";
      return reset;
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection
        .doc(user)
        .get()
        .then((docs) => {
          return docs.data();
        });
      // set user profile in state
      commit("setUserProfile", userProfile);
    },
    /**
     * clients Section Starts Here
     */
    updateEmployeeData({ commit }, data) {
      commit("setEmployees", data);
    },
    updateClientFromFirebase({ commit }, data) {
      fb.businessCollection
        .doc(data.id)
        .get()
        .then((docs) => {
          let data = docs.data();
          console.log(data);
          //localStorage.setItem("client",data)
        })
        .catch((err) => {
          console.Console.log(err);
        });
    },
    getPayrunEmployees({ commit }, calendar) {
      const selectedClient = JSON.parse(localStorage.getItem("client"));
      fb.businessCollection
        .doc(selectedClient.id)
        .collection("calendars")
        .doc(calendar)
        .get()
        .then((docs) => {
          let emp = docs.data();
          commit("setpayrunEmployees", emp.employees ?? []);
        });
    },

    updatePayrunEmployees({ commit }, values) {
      commit("setpayrunEmployees", values);
      console.log(values);
      const selectedClient = JSON.parse(localStorage.getItem("client"));
      // fb.businessCollection.doc(selectedClient.id).collection("calendars").doc().update({

      // })
    },
    getCurrentClient({ commit }) {
      const selectedClient = JSON.parse(localStorage.getItem("client"));
      commit("setCurrentClient", selectedClient);
    },
    async getClients({ commit }) {
      fb.businessCollection.onSnapshot((snapshot) => {
        const loadedEmployers = [];
        snapshot.forEach((doc) => {
          const loadedEmployer = doc.data();
          (loadedEmployer.id = doc.id), loadedEmployers.push(loadedEmployer);
        });
        commit("setClients", loadedEmployers);
      });
    },
    async addClients({ commit }, data) {
      commit("setLoading", true);

      const ref = fb.storage.ref();
      const url = await ref
        .child(data.logo.file.name)
        .put(data.logo.file, data.logo.file.type)
        .then((snapshot) => snapshot.ref.getDownloadURL());
      const payload = {
        company_name: data.company_name,
        company_email: data.company_email,
        company_phone: data.prefix + data.company_phone,
        kra_pin: data.kra_pin,
        address: data.company_address,
        logo: url,
      };
      console.log(url);

      await fb.businessCollection
        .doc(data.kra_pin)
        .set(payload)
        .then(() => {
          commit("setError", "");
          commit("setLoading", false);
          swal({
            title: "SUCCESS!",
            text: `Client added successfully`,
            icon: "success",
          });
        })
        .catch((err) => {
          commit("setLoading", false);
          commit("setError", err.message);
          swal({
            title: "OOPS!",
            text: `${err.message}`,
            icon: "error",
          });
        });
    },
    async updateClients({ commit }, data) {
      commit("setLoading", true);

      // const ref = fb.storage.ref();
      // const url = await ref
      //   .child(data.logo.file.name)
      //   .put(data.logo.file, data.logo.file.type)
      //   .then((snapshot) => snapshot.ref.getDownloadURL());
      const payload = {
        company_name: data.company_name,
        company_email: data.company_email,
        company_phone: data.prefix + data.company_phone,
        kra_pin: data.kra_pin,
        address: data.company_address,
      };


      await fb.businessCollection
        .doc(data.kra_pin)
        .update(payload)
        .then(() => {
          commit("setError", "");
          commit("setLoading", false);
          swal({
            title: "SUCCESS!",
            text: `Client details updated successfully`,
            icon: "success",
          }).then(()=>{
            router.push("/clients")
          })

        })
        .catch((err) => {
          commit("setLoading", false);
          commit("setError", err.message);
          swal({
            title: "OOPS!",
            text: `${err.message}`,
            icon: "error",
          });
        });
    },
    async getEmployees({ commit }) {
      const selectedClient = JSON.parse(localStorage.getItem("client"));
      fb.businessCollection
        .doc(selectedClient.kra_pin)
        .collection("team")
        .onSnapshot((snapshot) => {
          const loadedEmployers = [];
          snapshot.forEach((doc) => {
            const loadedEmployer = doc.data();
            (loadedEmployer.id = doc.id), loadedEmployers.push(loadedEmployer);
          });
          commit("setEmployees", loadedEmployers);
        });
    },
    async addEmployee({ commit }, data) {
      const selectedClient = JSON.parse(localStorage.getItem("client"));
      commit("setLoading", true);
      const payload = {
        email: data.email,
        address: data.address ?? "",
        phone_number: data.phone_number,
        kra_pin: data.kra_pin,
        national_id: data.national_id,
        status: data.status,
        date_of_appointment: new Date(data.date_of_appointment),
        date_of_birth: new Date(data.date_of_birth),
        contract_type: data.contract_type,
        allowances:
          {
            house_allowance:data.house_allowance,
            leave_allowance: data.leave_allowance,
            transportAllowance: data.transportAllowance,
            telephoneAllowance: data.telephoneAllowance,
            hardshipAllowance: data.hardshipAllowance,
            transferAllowance: data.transferAllowance,
            riskAllowance: data.riskAllowance,
            carAllowance: data.carAllowance,
            fuelAllowance: data.fuelAllowance,
            entertainmentAllowance: data.entertainmentAllowance,
          } ?? {},
        bank_name: data.bank_name,
        account_number: data.account_number,
        account_name: data.account_name,
        bank_branch: data.bank_branch,
        first_name: data.first_name,
        last_name: data.last_name,
        full_name: data.first_name + data.last_name,
        department: data.department,
        designation: data.designation,
        pay_rate: 0,
        hours_worked: 0,
        basic_pay: data.basic_pay,
        deductions:
          {
            life_insurance: data.life_insurance,
            helb: data.helb,
            pension: data.pension,
            sacco: data.sacco,
            nssf:200,
            salary_advance: data.salary_advance,
            mortgage: data.mortgage
          } ?? {},
        net_pay: 0,
        employment_type: "",
        nssf_number: data.nssf_number,
        nhif_number: data.nssf_number,
        Gender: data.gender,
      };
      await fb.businessCollection
        .doc(selectedClient.kra_pin)
        .collection("team")
        .doc(data.national_id)
        .set(payload)
        .then(() => {
          commit("setLoading", false);
          swal({
            title: "success!",
            text: `employee ${data.first_name} added successfully`,
            icon: "success",
          }).then(()=>{
            router.go(-1)
          })
        })
        .catch((err) => {
          commit("setLoading", false);
          swal({
            title: "OOPS!",
            text: `${err.message}`,
            icon: "error",
          });
        });
    },
    async deleteEmployee({ dispatch }, employee) {
      const userId = fb.auth.currentUser.uid;
      const result = await fb.businessCollection
        .doc(userId)
        .collection("team")
        .doc(employee.id)
        .delete();
      return result;
    },
    async createCalender({ commit }, data) {
      const selectedClient = JSON.parse(localStorage.getItem("client"));
      const payload = {
        calendar_name: data.calendar_name,
        date: data.date.toDate(),
        payment_cycle: data.payment_cycle,
      };
      await fb.businessCollection
        .doc(selectedClient.kra_pin)
        .collection("calendars")
        .add(payload)
        .then(() => {
          commit("setLoading", false);
          swal({
            title: "success!",
            text: `calendar added successfully`,
            icon: "success",
          });
        })
        .catch((err) => {
          commit("setLoading", false);
          swal({
            title: "OOPS!",
            text: `${err.message}`,
            icon: "error",
          });
        });
    },
    async getCalendars({ commit }) {
      const selectedClient = JSON.parse(localStorage.getItem("client"));
      fb.businessCollection
        .doc(selectedClient.kra_pin)
        .collection("calendars")
        .onSnapshot((snapshot) => {
          const loadedCalendars = [];
          snapshot.forEach((doc) => {
            const loadedCalendar = doc.data();
            (loadedCalendar.id = doc.id), loadedCalendars.push(loadedCalendar);
          });
          commit("setCalendars", loadedCalendars);
        });
    },
    async createDepartment({ commit, dispatch }, data) {
      const selectedClient = JSON.parse(localStorage.getItem("client"));
      commit("setLoading", true);
      fb.businessCollection
        .doc(selectedClient.kra_pin)
        .update({
          departments: fb.types.FieldValue.arrayUnion(data),
        })
        .then(() => {
          commit("setLoading", false);
          swal({
            title: "success!",
            text: `department added successfully`,
            icon: "success",
          });
        })
        .catch((err) => {
          commit("setLoading", false);
          swal({
            title: "OOps!",
            text: `something went wrong`,
            icon: "error",
          });
        });
    },
    async createDesignation({ commit }, data) {
      const selectedClient = JSON.parse(localStorage.getItem("client"));
      commit("setLoading", true);
      fb.businessCollection
        .doc(selectedClient.kra_pin)
        .update({
          designations: fb.types.FieldValue.arrayUnion(data),
        })
        .then(() => {
          commit("setLoading", false);
          swal({
            title: "success!",
            text: `record updated successfully`,
            icon: "success",
          });
        })
        .catch((err) => {
          commit("setLoading", false);
          swal({
            title: "OOps!",
            text: `something went wrong`,
            icon: "error",
          });
        });
    },
  },
  modules: {},
  getters: {
    loading: (state) => {
      return state.loading;
    },
    payrunEmployees: (state) => {
      return state.payrunEmployees;
    },
    employees: (state) => {
      return state.employees;
    },
  },
});
