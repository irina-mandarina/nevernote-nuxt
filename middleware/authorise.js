import { LSGetLogged, LSIsLogged } from "~~/js/localStorage"
import { useUserStore } from "~~/store/UserStore"
const userStore = useUserStore()

export default defineNuxtRouteMiddleware((to, from) => {
    // if (to === '/notes' || to === '/profile') {
    if (to.fullPath === '/notes' || to.fullPath === '/profile') {
        if (!userStore.logged) {
            if (LSIsLogged()) {
                userStore.logIn(LSGetLogged())
                return true
            }
            else {
                navigateTo('/') // to log in first
            }
        }
        else {
            console.log(3)
            return true
        }
    }
})