import { LSGetLogged, LSIsLogged } from "~~/js/localStorage"
import { useUserStore } from "~~/store/UserStore"
const userStore = useUserStore()
debugger
export default defineNuxtRouteMiddleware((to, from) => {
    // if (to === '/notes' || to === '/profile') {
    console.log(to.path)
    debugger
    // if (to.path === '/notes' || to.path === '/profile') {
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
    // }
})