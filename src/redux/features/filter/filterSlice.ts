import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  selectedCategory: '' 
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addToFilter: (state, action) => {     
      state.selectedCategory = action.payload; 
    },
    clearFilter: (state)=>{
      state.selectedCategory = ''; 
    }
  },
});


export const { addToFilter, clearFilter } = filterSlice.actions;

export default filterSlice.reducer;
