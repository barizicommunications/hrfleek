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
    calendars:[],
    loading: false,
    currentClient :{},
    error: "",
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setCurrentClient(state,val){
      state.currentClient=val
    },
    setClients(state, val) {
      state.clients = val;
    },
    setEmployees(state, val) {
      state.employees = val;
    },
    setCalendars(state,val){
      state.calendars=val
    },
    setLoading(state,val){
      state.loading =val
    },
    setError(state,val){
      state.error=val
    }

  },
  actions: {
    /**
     * Profile Section Starts Here
     */
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
        localStorage.clear()
        router.replace({ path: "/sign-in" });
      });
    
    },
    async updatePassword({ dispatch }, password) {
      const user = fb.auth.currentUser;
      await user.updatePassword(password).then(()=>{
        swal({
          title: "SUCCESS!",
          text: `Password updated successfully`,
          icon: "success",
        });
      }).catch((err)=>{
        swal({
          title: "OOPs!",
          text: `${err.message}`,
          icon: "error",
        });
      })
      
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
    getCurrentClient({commit}){
      const selectedClient=JSON.parse(localStorage.getItem("client"))
      commit("setCurrentClient",selectedClient)
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
      commit("setLoading", true)

      const ref = fb.storage.ref();
    const url =await ref
        .child(data.logo.file.name)
        .put(data.logo.file.originFileObj, data.logo.file.type)
        .then((snapshot) => snapshot.ref.getDownloadURL())
        const payload = {
          company_name: data.company_name,
          company_email: data.company_email,
          company_phone: data.prefix + data.company_phone,
          kra_pin: data.kra_pin,
          address: data.company_address,
          logo: url,
        };
        
        await fb.businessCollection
        .doc(data.kra_pin)
        .set(payload)
        .then(() => {
          commit("setError", "")
          commit("setLoading", false)
          swal({
            title: "SUCCESS!",
            text: `Client added successfully`,
            icon: "success",
          });
        }).catch((err) => {
          commit("setLoading", false)
          commit("setError", err.message)
          swal({
            title: "OOPS!",
            text: `${err.message}`,
            icon: "error",
          });
        });
    },
    async getEmployees({ commit }) {
      const selectedClient=JSON.parse(localStorage.getItem("client"))
      fb.businessCollection.doc(selectedClient.kra_pin).collection("team").onSnapshot((snapshot) => {
        const loadedEmployers = [];
        snapshot.forEach((doc) => {
          
          const loadedEmployer = doc.data();
          (loadedEmployer.id = doc.id), loadedEmployers.push(loadedEmployer);
        });
        commit("setEmployees", loadedEmployers);
      });
    },
    async addEmployee({ commit }, data) {
      const selectedClient=JSON.parse(localStorage.getItem("client"))
      commit("setLoading", true)
          const payload ={
          email: data.email,
          address:data.address??"",
          phone_number: data.phone_number,
          kra_pin:data.kra_pin,
          national_id:data.national_id,
          status:data.status,
          allowances:data.allowances??[],
          bank_name:data.bank_name,
          account_number:data.account_number,
          account_name:data.account_name,
          bank_branch:data.branch_name,       
          first_name:data.first_name ,
          last_name:data.last_name,
          full_name:data.first_name+data.last_name,
          department:data.department,
          designation:data.designation,
          pay_rate:0,
          hours_worked:0,
          basic_pay:data.basic_pay,
          deductions:data.deductions??[],
          net_pay:0,
          employment_type:""
        }
     await fb.businessCollection
        .doc(selectedClient.kra_pin)
        .collection("team").doc(data.national_id)
        .set(payload).then(()=>{
          commit("setLoading", false)
          swal({
            title: "success!",
            text: `employee ${data.first_name} added successfully`,
            icon: "success",
          });
        }).catch((err)=>{
          commit("setLoading", false)
          swal({
            title: "OOPS!",
            text: `${err.message}`,
            icon: "error",
          });
        })
      
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
    async createCalender({ commit }, data){

      const selectedClient=JSON.parse(localStorage.getItem("client"))
      const payload ={
        calendar_name:data.calendar_name,
        department:data.department,
        date:data.date.toDate(),
        payment_cycle:data.payment_cycle

      }
      await fb.businessCollection
      .doc(selectedClient.kra_pin)
      .collection("calendars")
      .add(payload).then(()=>{
        commit("setLoading", false)
        swal({
          title: "success!",
          text: `calendar added successfully`,
          icon: "success",
        });
      }).catch((err)=>{
        commit("setLoading", false)
        swal({
          title: "OOPS!",
          text: `${err.message}`,
          icon: "error",
        });
      })
    },
    async getCalendars({ commit }) {
      const selectedClient=JSON.parse(localStorage.getItem("client"))
      fb.businessCollection.doc(selectedClient.kra_pin).collection("calendars").onSnapshot((snapshot) => {
        const loadedCalendars = [];
        snapshot.forEach((doc) => {
          
          const loadedCalendar = doc.data();
          (loadedCalendar.id = doc.id), loadedCalendars.push(loadedCalendar);
        });
        commit("setCalendars", loadedCalendars);
      });
    },
    async createDepartment({commit},data){
      const selectedClient=JSON.parse(localStorage.getItem("client"))
      commit("setLoading", true)
      fb.businessCollection.doc(selectedClient.kra_pin).update({
        departments:fb.types.FieldValue.arrayUnion(data)
      }).then(()=>{
        commit("setLoading", false)
        swal({
          title: "success!",
          text: `department added successfully`,
          icon: "success",
        });
      }).catch((err)=>{
       commit("setLoading", false)
        swal({
          title: "OOps!",
          text: `something went wrong`,
          icon: "error",
        });
      })
    },
    async createDesignation({commit},data){
      const selectedClient=JSON.parse(localStorage.getItem("client"))
      commit("setLoading", true)
      fb.businessCollection.doc(selectedClient.kra_pin).update({
        designations:fb.types.FieldValue.arrayUnion(data)
      }).then(()=>{
        commit("setLoading", false)
        swal({
          title: "success!",
          text: `record updated successfully`,
          icon: "success",
        });
      }).catch((err)=>{
       commit("setLoading", false)
        swal({
          title: "OOps!",
          text: `something went wrong`,
          icon: "error",
        });
      })
    },
  
  },
  modules: {},
  getters:{
    loading: (state) => {
      return state.loading;
  }
  }
});
