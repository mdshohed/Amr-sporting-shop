// import { configureStore } from "@reduxjs/toolkit";
// // import { baseApi } from "./api/baseApi";
// import { 
//   persistStore,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist'

// import { baseApi } from "./api/baseApi";


// export const store = configureStore({
//   reducer: {
//     [baseApi.reducerPath]: baseApi.reducer, 
//   },
//   middleware: (getDefaultMiddlewares) => getDefaultMiddlewares({
//     serializableCheck: {
//       ignoredActions: [
//         FLUSH,
//         REHYDRATE,
//         PAUSE,
//         PERSIST,
//         PURGE,
//         REGISTER,
//       ],
//       ignoredPaths: ['firebase', 'firestore'],
//     },
//   }).concat(baseApi.middleware)
// })

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch

// export const persistor = persistStore(store); 

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import { persistReducer,persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage' 
import cartReducer from "./features/card/cardSlice";

const persistUserConfig = {
  key: "card",
  storage,
};

const persistedCardReducer = persistReducer(persistUserConfig, cartReducer);


export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    cart: persistedCardReducer,
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