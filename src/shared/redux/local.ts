import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const localReducer = createSlice({
  name: "local",
  initialState: {
    changed: "no",
  },
  reducers: {
    change: (state, action: PayloadAction<string>) => {
      state.changed = action.payload
      console.log(state.changed, "from store")
    },
  },
})
export const { change } = localReducer.actions
export default localReducer.reducer
