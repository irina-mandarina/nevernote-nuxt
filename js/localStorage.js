export function LSIsLogged() {
    if (typeof window !== 'undefined') 
    return !!localStorage.getItem('logged')
}

export function LSGetLogged() {
    if (typeof window !== 'undefined')
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

export function LSGetToken() {
    if (typeof window !== 'undefined')
    return localStorage.getItem('jwt')
}

export function LSSetToken(token) {
    try {
        localStorage.setItem("jwt", token)
    }
    catch (e) {
        console.log(e)
    }
}