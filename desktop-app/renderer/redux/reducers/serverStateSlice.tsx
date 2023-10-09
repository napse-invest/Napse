import { createSlice } from '@reduxjs/toolkit'

interface Server {
  id: string
  url: string
}
interface ServerState {
  servers: Record<string, Server>
}

const serverStateSlice = createSlice({
  name: 'serverState',
  initialState: {
    servers: {}
  } as ServerState,
  reducers: {
    ADD_SERVER: (state, action) => {
      state.servers[action.payload.name] = {
        id: '1',
        url: action.payload.url
      }
    },
    REMOVE_SERVER: (state, action) => {
      state.servers = Object.fromEntries(
        Object.entries(state.servers).filter(
          ([key, value]) => key !== action.payload
        )
      )
    }
  }
})

export const { ADD_SERVER, REMOVE_SERVER } = serverStateSlice.actions
export default serverStateSlice.reducer
