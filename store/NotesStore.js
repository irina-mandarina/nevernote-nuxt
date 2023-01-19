import { defineStore } from 'pinia'
import { addNote, editNote, getNotes, deleteNote, completeTask, togglePrivacy, getNote } from '~~/js/requests'

export const useNotesStore = defineStore('notesStore', {
  state: () => {
    return {
        notes: null,
        bigNoteId: -1,
        editing: null,
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
      this.editing = null
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
        toastr.error("Could not connect to server")
      }
      else {
        toastr.error("Could not add note: " + title + ".")
      }
    },

    async editNote(editedNote) {
      try {
        const response = await editNote(editedNote.id, editedNote.title, editedNote.content)
        if (response.status === 201) {
          for(let i = 0; i < this.notes.length; i++) {
            if (this.notes[i].id === editedNote.id) {
              this.notes[i] = response.data
            }
          }
        }
      } catch (error) {
        if (error.response.status === 500) {
          toastr.error("Could not connect to server")
          navigateTo('/')
        }
        else {
          toastr.error("Could not edit note: " + editedNote.title)
        }
      }
      
    },

    async completeTask(id) {
      try {
        const response = await completeTask(id)
        if (response.status === 200) {
          if (response.data.completed === true) {
            toastr.success("You completed a task!")
          }
          this.notes.filter(it => it.id === response.data.id)[0].completed = response.data.completed
        }
      }
      catch (error) {
        if (error.response.status === 404) {
          toastr.error("Task could not be completed. (404)")
        }
      }
    },
    
    async togglePrivacy(id) {
      try {
        const response = await togglePrivacy(id)
        if (response.status === 200) {
          toastr.info("Note is " + response.data.privacy)
          this.notes.filter(it => it.id === response.data.id)[0].privacy = response.data.privacy
        }
      }
      catch (error) {
        if (error.response.status === 404) {
          toastr.error("Privacy could not get changed. (404)")
        }
      }
    },

    async deleteNote(noteId) {
      try {
        const response = await deleteNote(noteId)
        if (response.status === 204) {
          this.notes = this.notes.filter((note) => note.id !== noteId)
        }
      } catch (error) {
        if (response.status === 500) {
          toastr.error("Could not connect to server")
        }
        else {
          toastr.error("Could not delete note. Status: " + response.status)
        }
      }
    }
  }

})