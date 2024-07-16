// src/redux/slices/interestSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface InterestState {
  showExpressInterest: boolean;
}

const initialState: InterestState = {
  showExpressInterest: false,
};

const interestSlice = createSlice({
  name: 'interest',
  initialState,
  reducers: {
    toggleExpressInterest: (state) => {
      state.showExpressInterest = !state.showExpressInterest;
    },
    showInterest: (state) => {
      state.showExpressInterest = true;
    },
    hideInterest: (state) => {
      state.showExpressInterest = false;
    },
  },
});

export const { toggleExpressInterest, showInterest, hideInterest } = interestSlice.actions;
export default interestSlice.reducer;
