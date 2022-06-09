import { createSlice } from "@reduxjs/toolkit";

const bmiSlice = createSlice({
  name: "bmi",
  initialState: {
    height: 180,
    weight: 70,
    age: 21,
    isMale: true,
  },
  reducers: {
    setHeight(state, action) {
      state.height = action.payload;
    },
    setWeight(state, action) {
      state.weight = action.payload;
    },
    setAge(state, action) {
      state.age = action.payload;
    },
    setIsMale(state, action) {
      state.isMale = action.payload;
    },
  },
});

export const selectHeight = (state) => state.bmi.height;
export const selectWeight = (state) => state.bmi.weight;
export const selectAge = (state) => state.bmi.age;
export const selectIsMale = (state) => state.bmi.isMale;

export const { setAge, setWeight, setHeight, setIsMale } = bmiSlice.actions;
export default bmiSlice.reducer;
