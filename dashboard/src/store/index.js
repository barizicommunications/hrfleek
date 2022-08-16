import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from "../firebase";
import router from "../router/index";
import swal from "sweetalert";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userProfile: {}
  },
  getters: {

  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    },
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
    getClients(){}
  },
  modules: {
  }
})
