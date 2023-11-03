import { configureStore } from "@reduxjs/toolkit"
import windowReducer from "./slices/window-manager-slice"
import desktopReducer from "./slices/desktop-slice"

export const store = configureStore({
  reducer: {
    windowReducer,
    desktopReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
