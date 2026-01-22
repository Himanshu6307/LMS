import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Slices/user.slice'

export const store = configureStore({
  reducer: {
    user: userReducer
  },
})
