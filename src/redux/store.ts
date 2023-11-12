import { configureStore } from "@reduxjs/toolkit"
import windowReducer from "./slices/window-manager-slice"

export const store = configureStore({
  reducer: {
    windowReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
