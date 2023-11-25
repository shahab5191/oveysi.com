import { configureStore } from "@reduxjs/toolkit"
import windowReducer from "./slices/window-manager-slice"
import fileSystemReducer from "./slices/file-system"
export const store = configureStore({
  reducer: {
    windowReducer,
    fileSystemReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
