import { defineStore } from 'pinia' // '@pinia/nuxt'
import { LSLogOut, LSSetLogged } from '~~/js/localStorage'
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
    },

    async requestLogIn(username, password) {
        const authorised = await logIn(username, password)
        if (authorised) {
          this.logIn(username)
        }
        else {
          console.log("Wrong password")
        }
    },

    async logIn(username) {
      this.username = username
      this.logged = true
      LSSetLogged(username)
      navigateTo('/notes')
    },

    async getUserDetails(username) {
      const details = await userDetails(username)
      if (details === null) {
        console.log("Could not get user details")
      }
      else {
        this.name = details.name
        this.age = details.age
        this.address = details.address
        this.bio = details.bio
        console.log(details.bio) // looks like: {"bio":"............."}, while the other details are just strings
      }
    },

    async logOut(username) {
      await logOut(username)
      LSLogOut(username)
      this.logged = false
      navigateTo('/')
    },

    editBio(username, newBio) {
      if (setBio(username, newBio)) {
        this.bio = newBio
      }
      else {
        console.log("Problem while adding a new bio")
      }
    }
  }
})