import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload
      const existingItem = state.items.find(i => i.name === item.name)
      if (existingItem) {
        existingItem.quantity += item.quantity
      } else {
        state.items.push(item)
      }
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload
      const item = state.items.find(i => i.name === name)
      if (item) {
        item.quantity = quantity
      }
    },
    removeItem: (state, action) => {
      const name = action.payload.name
      state.items = state.items.filter(item => item.name !== name)
    },
  },
})

export const { addItem, updateQuantity, removeItem } = cartSlice.actions
export default cartSlice.reducer
