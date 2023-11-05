import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

export enum ViewState {
  desktopview,
  overview,
  iconview,
}
interface State {
  viewState: ViewState
}

export const desktopSlice = createSlice({
  name: "desktop",
  initialState: {
    viewState: ViewState.iconview,
  } as State,
  reducers: {
    setViewState: (state, action: PayloadAction<ViewState>) => {
      state.viewState = action.payload
    },
  },
})
export const getViewState = (state: RootState) => {
  return state.desktopReducer.viewState
}

export const { setViewState } = desktopSlice.actions
export default desktopSlice.reducer
