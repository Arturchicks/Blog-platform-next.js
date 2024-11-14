import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const localReducer = createSlice({
  name: "local",
  initialState: {
    changed: false,
  },
  reducers: {
    change: (state, action: PayloadAction<boolean>) => {
      state.changed = action.payload
    },
  },
})
export const { change } = localReducer.actions
export default localReducer.reducer
