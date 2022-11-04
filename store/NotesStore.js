import { defineStore } from 'pinia'
import { addNote, editNote, getNotes, deleteNote } from '~~/js/requests'

export const useNotesStore = defineStore('notesStore', {
  state: () => {
    return {
        notes: null,
        bigNoteId: undefined,
        editingNoteId: undefined
    }
  },

  actions: {
    async getNotes(username) {
        this.notes = await getNotes(username)
    },

    addNote(username, title, content) {
      if (addNote(username, title, content)) { 
        let today = new Date()
        let date = today.getFullYear() + '.'+ (today.getMonth()+1) + '.' + today.getDate()
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        let dateTime = date + ' ' + time
        this.notes.push({title, content, date: dateTime})
      }
      else {
        console.log("Could not add note: " + title)
      }
    },

    editNote(username, editedNote) {
        // change this.notes
        console.log(editedNote)
        for(let i = 0; i < this.notes.length; i++) {
          if (this.notes[i].id === editedNote.id) {
            this.notes[i] = editedNote
          }
        }
        editNote(editedNote.id, username, editedNote.title, editedNote.content)
    },

    editingNote() {
      return (this.editingNoteId > 0)
    },

    cancelEdit() {
      document.querySelector("#editbox"+this.editingNoteId).classList.add("hidden")
      document.querySelector("#editbox"+this.editingNoteId).classList.remove("block")
      document.querySelector("#notebox"+this.editingNoteId).classList.add("block")
      document.querySelector("#notebox"+this.editingNoteId).classList.remove("hidden")
    },

    deleteNote(noteId, username) {
      this.notes = this.notes.filter((note) => note.id !== noteId)
      deleteNote(noteId, username)
    }
  }

})