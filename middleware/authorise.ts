import { LSGetLogged, LSIsLogged } from "~~/js/localStorage"
import { useUserStore } from "~~/store/UserStore"
const userStore = useUserStore()
// debugger
export default defineNuxtRouteMiddleware((to, from) => {
    // if (to === '/notes' ||
    // debugger
    // console.log(from)
    // console.log(to)
    if (!userStore.logged) {
        if (LSIsLogged()) {
            userStore.logIn(LSGetLogged())
            return true
        }
        else {
            return navigateTo('/login') // to log in first
        }
    }
    else {
        return true
    }
})