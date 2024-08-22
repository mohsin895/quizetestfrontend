// store/global.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    globalData: null
  }),
  actions: {
    async fetchGlobalData() {
      const globalUrl = 'http://localhost/loyelapi/public/api/get/setting/info'
     
      try {
        const response = await axios.get(globalUrl)
        this.setGlobalData(response.data)
      } catch (error) {
        console.error('Error fetching global data:', error)
      }
    },
    setGlobalData(data) {
      this.globalData = data;
    }
  }
})
