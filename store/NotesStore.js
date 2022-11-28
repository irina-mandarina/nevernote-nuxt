import { defineStore } from 'pinia'
import { addNote, editNote, getNotes, deleteNote } from '~~/js/requests'

export const useNotesStore = defineStore('notesStore', {
  state: () => {
    return {
        notes: [],
        bigNoteId: -1,
        editing: null
    }
  },

  actions: {
    async getNotes(username) {
      const {notes, status} = await getNotes(username)
      if (status === 200) {
        this.notes = notes
      }
      this.editing = new Map()
      this.fillEditing()
    },

    fillEditing() {
      for(let index = 0; index < this.notes.length; index++) {
        this.editing.set(this.notes[index].id, false)
      }
    },

    async addNote(username, title, content) {
      const {note, status} = await addNote(username, title, content)
      if (status === 201) { 
        let today = new Date()
        let date = today.getFullYear() + '.'+ (today.getMonth()+1) + '.' + today.getDate()
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        let dateTime = date + ' ' + time
        this.notes.push({id: note.id, title, content, date: dateTime})
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

    async editNote(username, editedNote) {
      console.log(username)
      const status = await editNote(editedNote.id, username, editedNote.title, editedNote.content)
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

    async deleteNote(noteId, username) {
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