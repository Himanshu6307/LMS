import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userDetail:null,
  loading:false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetail: (state,action) => {
      state.userDetail=action.payload;
    },
    setLoading: (state,action) => {
      state.loading=action.payload;
    },
    
  
  },
})

// Action creators are generated for each case reducer function
export const {setUserDetail,setLoading } = userSlice.actions

export default userSlice.reducer