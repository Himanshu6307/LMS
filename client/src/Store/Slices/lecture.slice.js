import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading:false,
  lectureDetail:[]
}

export const lectureSlice = createSlice({
  name: 'lecture',
  initialState,
  reducers: {
    setLectureDetail: (state,action) => {
      state.lectureDetail=action.payload;
    },
    setLoading: (state,action) => {
      state.loading=action.payload;
    }
  
    
  
  },
})

// Action creators are generated for each case reducer function
export const {setLectureDetail,setLoading} = lectureSlice.actions

export default lectureSlice.reducer