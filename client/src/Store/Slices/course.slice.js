import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  courseDetail:[]
}

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setCourseDetail: (state,action) => {
      state.courseDetail=action.payload;
    }
  
    
  
  },
})

// Action creators are generated for each case reducer function
export const {setCourseDetail} = courseSlice.actions

export default courseSlice.reducer