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

import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import { persistStore } from "redux-persist";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const persistor = persistStore(store);