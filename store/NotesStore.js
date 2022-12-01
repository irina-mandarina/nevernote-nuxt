import { defineStore } from 'pinia'
import { addNote, editNote, getNotes, deleteNote, completeTask } from '~~/js/requests'
import { useUserStore } from './UserStore'

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
    async getNotes(username) {
      const {notes, status} = await getNotes(username, this.noteType)
      if (status === 200) {
        this.notes = notes
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
      this.getNotes(useUserStore().username, this.noteType)
    },

    fillEditing() {
      for(let index = 0; index < this.notes.length; index++) {
        this.editing.set(this.notes[index].id, false)
      }
    },

    async addNote(username, title, content, deadline) {
      const {note, status} = await addNote(username, title, content, deadline)
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

    async completeTask(username, id) {
      const {status, note} = await completeTask(username, id)
      if (status === 200) {
        toastr.success("You completed a task!")
        this.notes.filter(it => it.id !== note.id).at(0) = note
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