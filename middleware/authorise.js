import { LSGetLogged, LSIsLogged } from "~~/js/localStorage"
import { useUserStore } from "~~/store/UserStore"
const userStore = useUserStore()

export default defineNuxtRouteMiddleware((to, from) => {
    // if (to === '/notes' || to === '/profile') {
    if (to.path === '/notes' || to.path === '/profile') {
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
            return true
        }
    }
})