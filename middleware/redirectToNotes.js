import { LSGetLogged, LSIsLogged } from "../js/localStorage"
import { useUserStore } from "../store/UserStore"

export default defineNuxtRouteMiddleware((to, from) => {    
    if (to.fullPath === '/') {
        const userStore = useUserStore()
        if (!userStore.logged) { // not logged in store
            if (LSIsLogged()) { // but is logged in local storage
                console.log(LSIsLogged())
                userStore.logIn(LSGetLogged()) // then log them in the store
                return navigateTo('/notes') // and redirect to notes
            }
            else {
                return navigateTo('/') // they are not logged anywhere so let them log in
            }
        }
        if (userStore.logged) { // logged in the store
            return navigateTo('/notes') // redirect to notes
        }
    }
})