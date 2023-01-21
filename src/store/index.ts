import { createStore } from 'vuex'

export default createStore({
  state: {
    db: require('@/json/items.json'),
    materials: {
      id: 2,
      name: "Металл"
    },
    basket: [],
    favorites: []
  },
  mutations: {
    setMaterial(state, payload) {
      let materials = require('@/json/materials.json');
      let result = materials.find((elem: { id: any; }) => elem.id == payload)
      state.materials = {
        id: Number(result.id),
        name: result.name
      }
    },
    addBasketToStorage(state: object | any, payload: any) {
      const storage: any = localStorage.getItem(payload.storeName)
      const parseStorage: Array<object> = JSON.parse(storage)

      const rest = storage != null ? parseStorage.findIndex((el: object | any) => {
        if (el.id == payload.el.id) return true
        else if (el.id != payload.el.id) return false
      }) : null

      if (storage == null || rest == -1) {
        state[`${payload.storeName}`].push(payload.el)
        localStorage.setItem(payload.storeName, JSON.stringify(state[`${payload.storeName}`]))
      }
    },
    addStorage(state: object | any, payload: any) {
      state[`${payload.storeName}`] = JSON.parse(`${payload.el}`)
    }
  },
  actions: {},
  getters: {
    getProductId(state) {
      return state.materials.id
    },
    getFilterProduct(state, getters: object | any) {
      return state.db.filter((elem: { material: object }) => elem.material == getters.getProductId)
    }
  }
})
