import { defineStore } from 'pinia'
import { addNote, editNote, getNotes, deleteNote, completeTask, togglePrivacy, getNote } from '~~/js/requests'

export const useNotesStore = defineStore('notesStore', {
  state: () => {
    return {
        notes: [],
        bigNoteId: -1,
        editing: null,
        noteType: "ALL",
    }
  },

  actions: {
    async getNotes() {
      const {notes, status} = await getNotes(this.noteType)
      if (status === 200) {
        this.notes = notes
      }
      this.editing = new Map()
      this.fillEditing()
    },

    async getNote(id) {
      const {note, status} = await getNote(id)
      if (status === 200) {
        return note
      }
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

    async addNote( title, content, deadline, privacy) {
      const {note, status} = await addNote(title, content, deadline, privacy)
      if (status === 201) { 
        let today = new Date()
        let date = today.getFullYear() + '.'+ (today.getMonth()+1) + '.' + today.getDate()
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        let dateTime = date + ' ' + time
        this.notes.push({id: note.id, title, content, date: dateTime, deadline, privacy})
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
      console.log(id)
      const {status, note} = await completeTask(id)
      if (status === 200) {
        if (note.completed === true) {
          toastr.success("You completed a task!")
        }
        this.notes.filter(it => it.id === note.id).at(0).completed = note.completed
      }
    },
    
    async togglePrivacy(id) {
      const {status, note} = await togglePrivacy(id)
      if (status === 200) {
        toastr.info("Note is " + note.privacy)
        this.notes.filter(it => it.id === note.id).at(0).completed = note.completed
      }
    },

    async deleteNote(noteId) {
      const status = await deleteNote(noteId, username)
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