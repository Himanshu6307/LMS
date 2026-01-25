import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Slices/user.slice'
import courseReducer from './Slices/course.slice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer,
  },
})
