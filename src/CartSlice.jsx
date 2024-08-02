import { createSlice } from '@reduxjs/toolkit'

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload
      const existingItem = state.items.find(item => item.name === newItem.name)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...newItem, quantity: 1 })
      }
    },
    removeItem: (state, action) => {
      const name = action.payload
      state.items = state.items.filter(item => item.name !== name)
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload
      const item = state.items.find(item => item.name === name)
      if (item) {
        item.quantity = quantity
        if (item.quantity <= 0) {
          state.items = state.items.filter(item => item.name !== name)
        }
      }
    },
  },
})

export const { addItem, removeItem, updateQuantity } = CartSlice.actions

export default CartSlice.reducer
