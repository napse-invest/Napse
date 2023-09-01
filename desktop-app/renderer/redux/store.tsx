import { configureStore } from '@reduxjs/toolkit'
import headerStateSlice from './reducers/headerStateSlice'
import type store from '@/redux/store'

export type RootStateType = ReturnType<typeof store.getState>
export default configureStore({
  reducer: {
    headerState: headerStateSlice
  }
})
