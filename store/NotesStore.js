import { defineStore } from 'pinia'
import { LSGetLogged } from '~~/js/localStorage'
import { addNote, editNote, getNotes, deleteNote, completeTask, togglePrivacy, getNote } from '~~/js/requests'

export const useNotesStore = defineStore('notesStore', {
  state: () => {
    return {
        notes: [],
        bigNoteId: -1,
        editing: new Map(),
        noteType: "ALL",
    }
  },

  actions: {
    async getNotes() {
      let response
      try {
        response = await getNotes(this.noteType)
      } 
      catch(error) {
        // delete this later!
        console.log(error)
        if (error.response.status === 401) {
          navigateTo("/login")
        }
        else if (error.response.status === 404) {
          toastr.error("404????")
        }
      }
      if (response.status === 200) {
        this.notes = response.notes
      }
      this.editing = new Map()
      this.fillEditing()
    },
    
    setNoteType(type) {
      if (!(["ALL", "NOTES", "TASKS", "TODO", "COMPLETED"].includes(type))) {
        this.noteType = "ALL"
      }
      else {
        this.noteType = type
      }
      this.getNotes(this.noteType)
    },

    fillEditing() {
      for(let index = 0; index < this.notes.length; index++) {
        this.editing.set(this.notes[index].id, false)
      }
    },

    async addNote(title, content, deadline, privacy) {
      const {note, status} = await addNote(title, content, deadline, privacy)
      if (status === 201) { 
        let today = new Date()
        let date = today.getFullYear() + '.'+ (today.getMonth()+1) + '.' + today.getDate()
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        let dateTime = date + ' ' + time
        this.notes.push(note)
      }
      else if (status === 500) {
        console.log("Could not connect to server")
      }
      else if (status === 401) {
        console.log("Unauthorised")
      }
      else {
        console.log("Could not add note: " + title + ". Status: " + status)
      }
    },

    async editNote(editedNote) {
      const status = await editNote(editedNote.id, editedNote.title, editedNote.content)
      if (status === 201) {
        for(let i = 0; i < this.notes.length; i++) {
          if (this.notes[i].id === editedNote.id) {
            this.notes[i] = editedNote
          }
        }
      }
      else if (status === 500) {
        console.log("Could not connect to server")
      }
      else if (status === 401) {
        console.log("Unauthorised")
      }
      else {
        console.log("Could not edit note: " + editedNote.title + ". Status: " + status)
      }
    },

    async completeTask(id) {
      let response = null
      try {
        response = await completeTask(id)
      }
      catch (error) {
        if (error.response.status === 404) {
          toastr.error("Task could not be completed. (404)")
        }
      }
      
      if (response.status === 200) {
        if (response.note.completed === true) {
          toastr.success("You completed a task!")
        }
        this.notes.filter(it => it.id === response.note.id).at(0).completed = response.note.completed
      }
    },
    
    async togglePrivacy(id) {
      let response = null
      try {
        response = await togglePrivacy(id)
      }
      catch (error) {
        if (error.response.status === 404) {
          toastr.error("Privacy could not get changed. (404)")
        }
      }
      
      if (response.status === 200) {
        toastr.info("Note is " + response.note.privacy)
        this.notes.filter(it => it.id === response.note.id).at(0).completed = response.note.completed
      }
    },

    async deleteNote(noteId) {
      const status = await deleteNote(noteId)
      if (status === 204) {
        this.notes = this.notes.filter((note) => note.id !== noteId)
      }
      else if (status === 500) {
        console.log("Could not connect to server")
      }
      else if (status === 401) {
        console.log("Unauthorised")
      }
      else {
        console.log("Could not delete note. Status: " + status)
      }
    }
  }

})