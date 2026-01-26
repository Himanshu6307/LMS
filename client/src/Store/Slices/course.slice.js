import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading:false,
  courseDetail:[]
}

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setCourseDetail: (state,action) => {
      state.courseDetail=action.payload;
    },
    setLoading: (state,action) => {
      state.loading=action.payload;
    }
  
    
  
  },
})

// Action creators are generated for each case reducer function
export const {setCourseDetail,setLoading} = courseSlice.actions

export default courseSlice.reducer