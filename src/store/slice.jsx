import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const MAXIMUM_SECTIONS = parseInt(import.meta.env.VITE_MAXIMUM_SECTIONS)

export const sectionSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {
    addSection: (state, action) => {
      const section = action.payload;
      state.push(section);
    },
    removeSection: (state, action) => {
      const crn = action.payload;
      return state.filter(section => section.CRN != crn);
    },
    setSections: (state, action) => {
      return action.payload;
    }
  }
})

export const { addSection, removeSection, setSections } = sectionSlice.actions
export default sectionSlice.reducer;