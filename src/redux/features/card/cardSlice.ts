import { createSlice } from "@reduxjs/toolkit";

// Define the initial state using that type
 type TForm = {
  name: '',
  email: '',
  phone: '',
  address: '',
 }
const initialState = {
  products: [] as any,
  selectedItems: 0,
  totalPrice: 0,
  tax: 0,
  taxRate: 0.05,
  grandTotal: 0,
  checkoutForm: {} as TForm, 
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {     
      const isExist = state.products.find(
        (product: any) => product._id === action.payload.product._id
      );
      console.log(isExist);
      
      if (!isExist) {
        state.products.push({ ...action.payload.product, quantity: action.payload.quantity });
      }
      state.selectedItems = selectSelectedItems(state);
      state.totalPrice = selectTotalPrice(state);
      state.tax = selectTax(state);
      state.grandTotal = selectGrandTotal(state);
    },

    updateQuantity: (state: any, action) => {
      state.products.map((product: any) => {
        if (product._id === action.payload.id) {
          if (action.payload.type === "increment") {
            product.quantity += 1;
          } else if (action.payload.type === "decrement" && product.quantity>1) {
            product.quantity -= 1;
          }
        }
        return product;
      });
      state.selectedItems = selectSelectedItems(state);
      state.totalPrice = selectTotalPrice(state);
      state.tax = selectTax(state);
      state.grandTotal = selectGrandTotal(state);
    },

    checkoutFormData: (state: any, action) => {
      state.checkout = action.payload; 
    },

    deleteFromCard: (state, action) => {   
      state.products = state.products.filter( (product:any)=> product._id !== action.payload);
      // console.log("delete", value );
      state.selectedItems = selectSelectedItems(state);
      state.totalPrice = selectTotalPrice(state);
      state.tax = selectTax(state);
      state.grandTotal = selectGrandTotal(state);
    },
    clearCart: (state)=>{
      state.products=[];
      state.selectedItems=0;
      state.totalPrice=0;
      state.tax=0;
      state.grandTotal=0;
      state.checkoutForm = {} as TForm; 
    }
  },
});

export const selectSelectedItems = (state: any) =>
  state.products.reduce((total: number, product: any) => {
    return Number(total + product.quantity);
  }, 0);

export const selectTotalPrice = (state: any) =>
  state.products.reduce((total: number, product: any) => {
    return Number(total + product.quantity * product.price);
  }, 0);

export const selectTax = (state: any) =>
  selectTotalPrice(state) * state.taxRate;

export const selectGrandTotal = (state: any) => {
  return selectTotalPrice(state) + selectTotalPrice(state) * state.taxRate;
};

export const { addToCart, updateQuantity, clearCart, deleteFromCard, checkoutFormData } = cartSlice.actions;

export default cartSlice.reducer;
