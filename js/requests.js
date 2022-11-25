import { LSGetToken, LSSetToken } from "./localStorage"

export async function getNotes(username) {
    const notes = await fetch ('http://localhost:5173/notes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            username,
            'Authorization': 'Bearer ' + LSGetToken(),
        }
    })
        .then((response) => response.json())
        .then((response) => JSON.parse(JSON.stringify(response.getNotes)))
        .catch((error) => {
            console.log(error)
        })
    if (notes !== null && notes !== undefined) {
        return notes
    }
    else return []
}

export async function addNote(username, title, content) {
    const requestBody = {
        title,
        content
    }
    let copy
    const response = await fetch ('http://localhost:5173/notes', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json',
            username,
            'Authorization': 'Bearer ' + LSGetToken(),
        }
    })
        .then((response) => copy = response.clone())
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
            copy = {status: 'ERR_FAILED'}
        })
        console.log(response)
    // return response.status === 201
    return {response, status: copy.status}
}

export async function deleteNote(id, username) {
    const response = await fetch ('http://localhost:5173/notes/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + LSGetToken(),
            username
        }
    })
        .catch((error) => {
            console.log(error)
        })
    return response.status
}

export async function editNote(id, username, title, content) {
    const requestBody = {
        title,
        content
    }
    const response = await fetch ('http://localhost:5173/notes/' + id, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json, text/plain, */*",
            'Authorization': 'Bearer ' + LSGetToken(),
            username
        }
    })
        .catch((error) => {
            console.log(error)
        })
    return response.status
}

export async function register(username, password, name, address, age) {
    const requestBody = {
        username,
        password,
        name,
        age,
        address
    }
    let copy
    const response = await fetch ('http://localhost:5173/auth/register', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json, */*"
        }
    })
        .then((response) => copy = response.clone())
        .then (response => response.text())
        .catch((error) => {
            console.log(error)
        })
    LSSetToken(response)
    return copy.status
}

export async function logIn(username, password) {
    const requestBody = {
        username,
        password
    }
    let copy
    const response = await fetch ('http://localhost:5173/auth/login', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json, */*",
        }
    })
        .then((response) => copy = response.clone())
        .then (response => response.text())
        LSSetToken(response)
    return copy.status
}

export async function logOut(username) {
    fetch ('http://localhost:5173/auth/logout', {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json, */*",
            'Authorization': 'Bearer ' + LSGetToken(),
            username
        }
    })
        .catch((error) => {
            console.log(error)
        })
}

export async function userDetails(username) {
    let copy
    const details = await fetch ('http://localhost:5173/profile/details', {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json, */*",
            'Authorization': 'Bearer ' + LSGetToken(),
            username
        }
    })
        .then((response) => copy = response.clone())
        .then((response) => response.json())
        .then((response) => JSON.parse(JSON.stringify(response)))
        .catch((error) => {
            console.log(error)
            copy = {status: 'ERR_FAILED'}
        })
    return {details, status: copy.status}
}

export async function setBio(username, bio) {
    const requestBody = bio
    const response = await fetch ('http://localhost:5173/profile/setbio', {
        method: 'PUT',
        body: bio,
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json, */*",
            'Authorization': 'Bearer ' + LSGetToken(),
            username
        }
    })
    return response.status
}