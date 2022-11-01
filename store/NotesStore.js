import { defineStore } from 'pinia'
import { addNote, editNote, getNotes } from '~~/js/requests'

export const useNotesStore = defineStore('notesStore', {
  state: () => {
    return {
        notes: null
    }
  },

  actions: {
    async getNotes(username) {
        this.notes = await getNotes(username)
        console.log(this.notes)
    },

    addNote(username, title, content) {
        // state.notes.push(newNote)
        addNote(username, title, content)
    },

    editNote(id, username, title, content) {
        // change this.notes
        // for(let i = 0; i < state.notes.length; i++) {
        //   if (state.notes[i].id === editedNote.id) {
        //     state.notes[i] = editedNote
        //   }
        // }
        editNote(id, username, title, content)
    }
    // state.notes = state.notes.filter((note) => note.id !== noteId)
  }

})