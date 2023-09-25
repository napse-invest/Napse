import { createSlice } from '@reduxjs/toolkit'

const serverStateSlice = createSlice({
  name: 'serverState',
  initialState: {
    serverName: 'Servers',
    serverUrl: 'localhost'
  },
  reducers: {
    SET_SERVER_NAME: (state, action) => {
      state.serverName = action.payload
    },
    SET_SERVER_URL: (state, action) => {
      state.serverUrl = action.payload
    }
  }
})

export const { SET_SERVER_NAME, SET_SERVER_URL } = serverStateSlice.actions
export default serverStateSlice.reducer
