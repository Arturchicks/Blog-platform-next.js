import { createSlice, PayloadAction } from "@reduxjs/toolkit"
type Local = {
  changed: string[]
}
const localReducer = createSlice({
  name: "local",
  initialState: {
    changed: [] as string[],
  },
  reducers: {
    change: (state, action: PayloadAction<string>) => {
      state.changed.push(action.payload)
    },
  },
})
export const { change } = localReducer.actions
export default localReducer.reducer
