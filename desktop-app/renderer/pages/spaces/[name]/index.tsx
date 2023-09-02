import ContextHeader from '@/components/layout/contextHeader'
import React from 'react'
import { useSelector } from 'react-redux'
import type { RootStateType } from '@/redux/store'
export default function Spaces(): JSX.Element {
  const { name } = useSelector((state: RootStateType) => state.headerState)
  return <ContextHeader isBot>{name}</ContextHeader>
}
