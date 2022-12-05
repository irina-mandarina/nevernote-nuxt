import { LSGetToken, LSSetToken } from "./localStorage"
import axios from 'axios'

export async function getNotes(noteType) {
    const response = await axios.get("http://localhost:5173/notes",
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + LSGetToken(),
            },
            params: {
                noteType
            }
        }
    )
        .catch(function (error) {
            console.log(error);
        })
    return {notes: response.data.getNotes, status: response.status}
}

export async function getNote(id) {
    const response = await axios.get("http://localhost:5173/notes/" + id,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + LSGetToken(),
            }
        }
    )
        .catch(function (error) {
            console.log(error);
        })
    return {notes: response.data.getNote, status: response.status}
}

export async function addNote(title, content, deadline, privacy) {
    const response = await axios.post("http://localhost:5173/notes", 
        {
            title,
            content,
            deadline,
            privacy
        }, 
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + LSGetToken(),
            }
        }
    )
        .catch(function (error) {
            console.log(error);
        })
    return {note: response.data, status: response.status}
}

export async function deleteNote(id) {
    const response = await axios.delete("http://localhost:5173/notes/" + id, 
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + LSGetToken(),
            }
        }
    )
        .catch(function (error) {
            console.log(error);
        })
    return response.status
}

export async function editNote(id, title, content) {
    const response = await axios.put("http://localhost:5173/notes/" + id, 
        {
            title,
            content
        }, 
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + LSGetToken(),
            }
        }
    )
        .catch(function (error) {
            console.log(error);
        })
    return response.status
}


export async function completeTask(id) {
    const response = await axios.put("http://localhost:5173/notes/" + id + "/completed", 
        {}, 
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + LSGetToken(),
            }
        }
    )
        .catch(function (error) {
            console.log(error);
        })
    return {status: response.status, note: response.data}
}

export async function togglePrivacy(id) {
    const response = await axios.put("http://localhost:5173/notes/" + id + "/privacy", 
        {}, 
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + LSGetToken(),
            }
        }
    )
        .catch(function (error) {
            console.log(error);
        })
    return {status: response.status, note: response.data}
}

export async function register(username, password, name, address, age) {
    const response = await axios.post("http://localhost:5173/auth/register", 
        {
            username,
            password,
            name,
            age,
            address
        }, 
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    )
        // .then(function (response) {
        //     return response.status
        // })
        .catch(function (error) {
            console.log(error);
        })
        // .then(function () {
        //     return 404
        // })
    return response.status
}

export async function logIn(username, password) {
    const response = await axios.post("http://localhost:5173/auth/login", 
        {
            username,
            password
        }, 
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    )
        .catch(function (error) {
            console.log(error);
        })
    LSSetToken(response.data)
    return response.status
}

export async function logOut(username) {
    try {
        const response = await axios.post("http://localhost:5173/auth/logout",
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + LSGetToken(),
                }
            }
        )
        return response.status
    } catch(error) {
        console.log(error);
        throw error
    }
}

export async function userDetails() {
    const response = await axios.get("http://localhost:5173/profile/details",
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + LSGetToken(),
            }
        }
    )
        .catch(function (error) {
            console.log(error);
        })
    return {details: response.data, status: response.status}
}

export async function setBio(bio) {
    const response = await axios.put("http://localhost:5173/profile/set-bio",
        bio,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + LSGetToken(),
            }
        }
    )
        .catch(function (error) {
            console.log(error);
        })
    return response.status
}