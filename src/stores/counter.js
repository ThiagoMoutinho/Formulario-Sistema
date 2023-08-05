import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounter= defineStore('counter', {
  
  state: function() {
    return {
      count:0
    }
  },

  getters: {
    getCounter(state) {
      return `counter ${state.count}`
    }
  },

  actions: {
    increment() {
      this.count++;
    }
  }
})


export { useCounter };
