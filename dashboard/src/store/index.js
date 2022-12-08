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
    departments:[],
    error: "",
    banks:[],
    admins:[]
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
    setDepartments(state,val){
      state.departments=val
    },
    setBanks(state,val){
      state.banks =val
    },
    setAdmins(state,val){
      state.admins=val
    }
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
          fb.adminCollections.doc(user.uid).update({password:password}).then(()=>{
            swal({
              title: "SUCCESS!",
              text: `Password updated successfully`,
              icon: "success",
            }).then(()=>{
              router.push('/sign-in')
            })
          })

        })
        .catch((err) => {
          swal({
            title: "OOPs!",
            text: `${err.message}`,
            icon: "error",
          }).then(()=>{
           dispatch('logout')
          })
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
          })
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
     getCurrentClient({ commit }) {
      const selectedClient = JSON.parse(localStorage.getItem("client"));
      commit("setCurrentClient", selectedClient);
    },
    updateEmployeeData({ commit }, data) {
      commit("setEmployees", data);
    },
    updateClientFromFirebase({state, commit }, data) {
    let client =state.clients.find((c) => c.id === data.id);
    localStorage.setItem("client",JSON.stringify(client))
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

    async getBanks({ commit }) {
      fb.banksCollection.onSnapshot((snapshot) => {
        const loadedEmployers = [];
        snapshot.forEach((doc) => {
          const loadedEmployer = doc.data();
          (loadedEmployer.id = doc.id), loadedEmployers.push(loadedEmployer);
        });
        commit("setBanks", loadedEmployers);
      });
    },
    async getAdmins({ commit }) {
      fb.adminCollections.onSnapshot((snapshot) => {
        const loadedEmployers = [];
        snapshot.forEach((doc) => {
          const loadedEmployer = doc.data();
          (loadedEmployer.id = doc.id), loadedEmployers.push(loadedEmployer);
        });
        commit("setAdmins", loadedEmployers);
      });
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
        bank_name:data.bank_name,
        bank_branch:data.bank_branch,
        account_name:data.account_name,
        account_number:data.account_number,
        nssf_rates:data.nssf_rates,
        branches:data.branches??[],
        setup:"incomplete",
        nssf_number:data.nssf_number,
        nhif_number:data.nhif_number,
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
    //allowances & deductions
    async addAllowance({commit},data){
      console.log(data.id)
      fb.businessCollection.doc(data.id).update({
        allowances:fb.types.FieldValue.arrayUnion(data.values)
      }).then(()=>{
        swal({
          title: "SUCCESS!",
          text: `allowances updated successfully`,
          icon: "success",
        })
      })

    },
    
    async addDeduction({commit},data){
      console.log(data.id)
      fb.businessCollection.doc(data.id).update({
        deductions:fb.types.FieldValue.arrayUnion(data.values)
      }).then(()=>{
        swal({
          title: "SUCCESS!",
          text: `deductions updated successfully`,
          icon: "success",
        })
      })

    },
    async updateClients({ commit }, data) {
      commit("setLoading", true);
      const payload = {
        company_name: data.company_name,
        company_email: data.company_email,
        company_phone: data.prefix + data.company_phone,
        kra_pin: data.kra_pin,
        address: data.company_address,
        nssf_number:data.nssf_number,
        nhif_number:data.nhif_number,
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
        reviewer:data.reviewer
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
      commit("setLoading", true);
      fb.businessCollection
        .doc(data.client)
        .update({
          departments: fb.types.FieldValue.arrayUnion(data.departments),
        })
        .then(() => {
          commit("setLoading", false);
          swal({
            title: "success!",
            text: `department added successfully`,
            icon: "success",
          })
        
        })
        .catch((err) => {
          commit("setLoading", false);
          swal({
            title: "OOps!",
            text: `${err}`,
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
