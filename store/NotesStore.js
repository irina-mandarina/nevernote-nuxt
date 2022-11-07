import { defineStore } from 'pinia'
import { addNote, editNote, getNotes, deleteNote } from '~~/js/requests'

export const useNotesStore = defineStore('notesStore', {
  state: () => {
    return {
        notes: null,
        bigNoteId: -1,
        editing: null
    }
  },

  actions: {
    async getNotes(username) {
        this.notes = await getNotes(username)
        
        this.editing = new Map()
        this.fillEditing()
    },

    fillEditing() {
      for(let index = 0; index < this.notes.length; index++) {
        this.editing.set(this.notes[index].id, false)
      }
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
        for(let i = 0; i < this.notes.length; i++) {
          if (this.notes[i].id === editedNote.id) {
            this.notes[i] = editedNote
          }
        }
        editNote(editedNote.id, username, editedNote.title, editedNote.content)
    },

    deleteNote(noteId, username) {
      this.notes = this.notes.filter((note) => note.id !== noteId)
      deleteNote(noteId, username)
    }
  }

})