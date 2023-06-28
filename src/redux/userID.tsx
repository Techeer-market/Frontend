/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const userIdSlice = createSlice({
  name: 'userIdSlice',
  initialState: { value: '' },
  reducers: {
    setUUID: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default userIdSlice.reducer;
export const { setUUID } = userIdSlice.actions;
