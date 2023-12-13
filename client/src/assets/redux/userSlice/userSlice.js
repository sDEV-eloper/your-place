import { createSlice } from "@reduxjs/toolkit";

const initialState={
  currentUser: null,
  error: null, 
  loading: false,
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      signInStart:(state)=>{
        state.loading=true
      },
      signInSuccess: (state, action) => {
        state.currentUser = action.payload;
        state.loading=false;
        state.error=null
      },
      signInFail: (state, action) => {
        state.loading=false;
        state.error=action.payload
        },
        updateUserSuccess:(state, action)=>{
          state.currentUser=action.payload
        },
        updateUserFailure:(state, action)=>{
          state.error=action.payload
        },
        signOutSuccess:(state, action)=>{
          state.currentUser=action.payload
        },
      },
  });

 export const { signInFail, signInStart, signInSuccess, signOutSuccess, updateUserFailure, updateUserSuccess } = userSlice.actions;
export default userSlice.reducer;