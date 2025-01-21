import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface initialStateTypes {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
}

const initialState: initialStateTypes = {
  isSidebarCollapsed: false,
  isDarkMode: false,
};
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleSidebar: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggleSidebar, toggleDarkMode } = globalSlice.actions;
export default globalSlice.reducer;
