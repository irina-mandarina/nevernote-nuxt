import { defineStore } from 'pinia'
import { LSLogOut, LSSetLogged, LSSetToken } from '~~/js/localStorage'
import { logIn, logOut, register, userDetails, setBio, getRoles } from '~~/js/requests'

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
        username: null,
        name: null,
        age: 0,
        address: null,
        bio: null,
        logged: false,
        server: ref(true),
        roles: []
    }
  },

  actions: {
    async register(user) {
      await register(user)
      this.logIn(user.username)
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
      this.getRoles()
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
      else if (status === 500) {
        console.log("Could not connect to server")
      }
      return status
    },

// clean
    async logOut(username) {
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
        this.username = null,
        this.name = null,
        this.age = 0,
        this.address = null,
        this.bio = null,
        this.logged = false,
        this.server = ref(true),
        this.roles = []
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
    },

    async getRoles() {
      try {
        const response = await getRoles()
        for (let i = 0; i < response.data.length; i++) {
          this.roles.push(response.data[i].role)
        }
      }
      catch (error) {
        console.log(error)
        if (error.response.status === 401) {
          navigateTo('/')
        }
      }
    }
  }
})