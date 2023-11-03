import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface State {
  overview: boolean
}

export const desktopSlice = createSlice({
  name: "desktop",
  initialState: {
    overview: true,
  } as State,
  reducers: {
    toggleIsOverview: (state) => {
      state.overview = !state.overview
    },
    setIsOverview: (state, action: PayloadAction<boolean>) => {
      state.overview = action.payload
    },
  },
})
export const getIsOverview = (state: RootState) => {
  return state.desktopReducer.overview
}

export const { setIsOverview,toggleIsOverview } = desktopSlice.actions
export default desktopSlice.reducer
