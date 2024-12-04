import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { act } from "react"
type Local = {
  changed: string[]
}
const localReducer = createSlice({
  name: "local",
  initialState: {
    changed: [] as string[],
    user: "" as string,
  },
  reducers: {
    change: (state, action: PayloadAction<string>) => {
      state.changed.push(action.payload)
    },
    setUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload
    },
  },
})
export const { change, setUser } = localReducer.actions
export default localReducer.reducer
