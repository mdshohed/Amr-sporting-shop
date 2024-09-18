import { createSlice } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState = {
  name: '',
  email: '',
  phone: '',
  address: '',
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    addToCart: (state, action) => {   
         
      
    },

    clearCheckoutForm: (state)=>{
      state.name= '';
      state.email= '';
      state.phone= '';
      state.address='';
    }
  },
});


export const {clearCheckoutForm } = checkoutSlice.actions;

export default checkoutSlice.reducer;
