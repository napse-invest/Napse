import { createSlice } from '@reduxjs/toolkit'

const headerStateSlice = createSlice({
  name: 'headerState',
  initialState: {
    isContainerMode: false,
    tab: '',
    id: '',
    spaceIds: []
  },
  reducers: {
    SET_CONTAINER_STATE: (state, action) => {
      state.isContainerMode = action.payload
    },
    SET_TAB: (state, action) => {
      state.tab = action.payload
    },
    SET_ID: (state, action) => {
      state.id = action.payload
    },
    SET_SPACE_IDS: (state, action) => {
      state.spaceIds = action.payload
    }
  }
})

export const { SET_CONTAINER_STATE, SET_TAB, SET_SPACE_IDS, SET_ID } =
  headerStateSlice.actions
export default headerStateSlice.reducer
