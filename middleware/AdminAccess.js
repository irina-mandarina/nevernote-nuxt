import { LSGetLogged, LSIsLogged } from "~~/js/localStorage"
import { useUserStore } from "~~/store/UserStore"
const userStore = useUserStore()

export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path === '/roles') {
        if (!userStore.logged) {
            if (LSIsLogged()) {
                userStore.logIn(LSGetLogged())
            }
            else {
                return navigateTo('/login') // to log in first
            }
        }
        if (userStore.roles.includes('ADMIN')) {
            return true
        }
        else {
            return navigateTo('/forbidden')
        }
    }
})