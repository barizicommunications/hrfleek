import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from "../firebase";
import router from "../router/index";
import swal from "sweetalert";
const axios = require("axios").default;

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userProfile: {},
    clients:[]
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setClients(state,val){
      state.clients =val
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
          router.replace({ path: "/sign-in" });
        });
      },
      async updatePassword({ dispatch }, password) {
        const user = fb.auth.currentUser;
        let result = user.updatePassword(password);
        return result;
      },
      async resetPassword({ dispatch }, email) {
        const reset = await fb.auth.sendPasswordResetEmail(email).then(()=>{
          swal({
            title: "SUCCESS!",
            text: 'the password reset link has been sent to your email',
            icon: "success",
          });
        }).catch((err)=>{
          swal({
            title: "OOPS!",
            text: `${err}`,
            icon: "error",
          });
        });
        this.state.error = "";
        return reset;
      },
    async fetchUserProfile({ commit },user) {
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
    getClients({commit}){
      axios
      .get(
        `http://localhost:5001/scanpal-f74da/us-central1/barizi/clients/get/all`
      )
      .then((res) => {
        const clients = res.data.partner;
        commit("setClients", clients);
      })
      .catch((error) => {
        console.log(error);
      });
    },
   async addClients({dispatch},data){
      const ref = fb.storage.ref();
      const url = await ref
        .child(data.logo.file.name)
        .put(data.logo.file, data.logo.file.type)
        .then((snapshot) => snapshot.ref.getDownloadURL());
        const payload ={
          company_name: data.company_name,
          company_email: data.company_email,
          company_phone: data.prefix+data.company_phone,
          address: data.company_address,
          logo:url
        }
   
      axios
      .post(
       ' http://localhost:5001/scanpal-f74da/us-central1/barizi/clients/create',payload
      )
      .then((response) => {
        console.log(response)
      })
      .catch((e) => {
        alert(e.message);
      });
    }
  },
  modules: {
  }
})
