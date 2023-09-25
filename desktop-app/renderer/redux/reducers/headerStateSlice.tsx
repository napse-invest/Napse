import { createSlice } from '@reduxjs/toolkit'

const headerStateSlice = createSlice({
  name: 'headerState',
  initialState: {
    isContainerMode: false,
    tab: '',
    name: '',
    spaceNames: []
  },
  reducers: {
    SET_CONTAINER_STATE: (state, action) => {
      state.isContainerMode = action.payload
    },
    SET_TAB: (state, action) => {
      state.tab = action.payload
    },
    SET_NAME: (state, action) => {
      state.name = action.payload
    },
    SET_SPACE_NAMES: (state, action) => {
      state.spaceNames = action.payload
    }
  }
})

export const { SET_CONTAINER_STATE, SET_TAB, SET_SPACE_NAMES, SET_NAME } =
  headerStateSlice.actions
export default headerStateSlice.reducer
