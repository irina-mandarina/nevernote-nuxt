export function LSIsLogged() {
    return !!localStorage.getItem('logged')
}

export function LSGetLogged() {
    return localStorage.getItem('logged')
}

export function LSSetLogged(username) {
    try {
        localStorage.setItem("logged", username)
    }
    catch (e) {
        console.log(e)
    }
}

export function LSLogOut(username) {
    let loggedUser
    try{
        loggedUser = localStorage.getItem("logged")
    } 
    catch (e) {
        console.log(e)
    }
    if (loggedUser === username) {
        localStorage.removeItem("logged")
    }
    localStorage.removeItem("logged")
}