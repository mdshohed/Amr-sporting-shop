
import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import { persistReducer,persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage' 
import cartReducer from "./features/card/cardSlice";
import filterSlice from "./features/filter/filterSlice";

const persistUserConfig = {
  key: "card",
  storage,
};

const persistedCardReducer = persistReducer(persistUserConfig, cartReducer);


export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    cart: persistedCardReducer,
    filter: filterSlice, 
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      baseApi.middleware
    ),
});


export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const persistor = persistStore(store);