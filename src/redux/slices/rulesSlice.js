import { createSlice } from '@reduxjs/toolkit';

const rulesSlice = createSlice({
  name: 'rules',
  initialState: [],
  reducers: {
    addRule(state, action) {
      state.push(action.payload);
    },
  },
});

export const { addRule } = rulesSlice.actions;
export default rulesSlice.reducer;
