import { LSGetLogged, LSIsLogged } from "~~/js/localStorage"
import { useUserStore } from "~~/store/UserStore"
const userStore = useUserStore()

export default defineNuxtRouteMiddleware((to, from) => {
    // if (to === '/notes' || to === '/profile') {
    if (from.fullPath === '/') {
        if (!userStore.logged) {
            if (LSIsLogged()) {
                userStore.logIn(LSGetLogged())
                return navigateTo('/notes')
            }
        }
        else {
            return navigateTo('/notes')
        }
        return abortNavigation("Log in first.")
    }
})