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
    },

    addNote(username, title, content) {
        // change this.notes
        addNote(username, title, content)
    },

    editNote(id, username, title, content) {
        // change this.notes
        editNote(id, username, title, content)
    }
  }

})