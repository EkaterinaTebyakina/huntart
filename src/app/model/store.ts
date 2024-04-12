import { configureStore } from "@reduxjs/toolkit";
import { artsReducer } from "./slices/artsSlice";
import { artReducer } from "./slices/artSlice";
import { authReducer } from "./slices/authSlice"
import { userReducer } from "./slices/userSlice";
import { authorsReducer } from "./slices/authorsSlice";

const store = configureStore({
  reducer: {
    arts: artsReducer,
    art: artReducer,
    auth: authReducer,
    user: userReducer,
    authors: authorsReducer,
  }
})

export default store;

export type RootState = ReturnType<typeof store.getState>