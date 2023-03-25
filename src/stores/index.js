import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    count: 0,
    userLogged: false
  }),
  actions: {
    addCount() {
      this.count++
    },
    changeUserLogged() {
      this.userLogged = !this.userLogged
    }
  }
})
