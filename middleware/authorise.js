import { LSGetLogged, LSIsLogged } from "~~/js/localStorage"
import { useUserStore } from "~~/stores/UserStore"
const userStore = useUserStore()

export default authorise((to, from) => {
    // if (to === '/notes' || to === '/profile') {
    if (from === '/login') {
        if (!userStore.logged) {
            if (LSIsLogged()) {
                userStore.logIn(LSGetLogged())
                return navigateTo('/')
            }
        }
        else {
            return navigateTo('/')
        }
    }
    return abortNavigation("Log in first.")
})