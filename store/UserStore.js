import { defineStore } from 'pinia'
import { LSLogOut, LSSetLogged, LSSetToken } from '~~/js/localStorage'
import { logIn, logOut, register, userDetails, setBio } from '~~/js/requests'

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
        username: null,
        password: null,
        name: null,
        age: 0,
        address: null,
        bio: null,
        logged: false
    }
  },

  actions: {
    async register(user) {
      await register(user.username, user.password, user.name, user.address, user.age)
      this.password = password
      this.logIn(username)
      navigateTo('/notes')
    },

    async requestLogIn(username, password) {
        const status = await logIn(username, password)
        if (status === 200) {
          this.logIn(username)
        }
        else {
          console.log("Wrong password")
        }
        return status === 200
    },

    async logIn(username) {
      this.username = username
      this.logged = true
      LSSetLogged(username)
    },

    async getUserDetails() {
      const {details, status} = await userDetails()
      if (status === 200) {
        this.name = details.name
        this.age = details.age
        this.address = details.address
        this.bio = details.bio
      }
      else if (status === 401) {
        console.log("UnUTHORISED")
      }
      else if (status === 500) {
        console.log("Could not connect to server")
      }
      return status
    },


    async logOut() {
      if (!username) {
        LSLogOut(username)
        LSSetToken("")
        this.logged = false
        navigateTo('/login')
        return
      }
      const status = await logOut()
      if (status === 204 || status === 401 || status === undefined) {
        LSLogOut(username)
        LSSetToken("")
        this.logged = false
        navigateTo('/')
      }
    },

    editBio(newBio) {
      if (setBio(newBio)) {
        this.bio = newBio
      }
      else {
        console.log("Problem while adding a new bio")
      }
    }
  }
})