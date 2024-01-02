import { Fleet } from '@/api/fleets/fleets'
import { Dispatch, SetStateAction } from 'react'

export default function CreateFleetDialog({
  fleets,
  setFleets,
  disabledButton
}: {
  fleets: Fleet[]
  setFleets: Dispatch<SetStateAction<Fleet[]>>
  disabledButton?: boolean
}): JSX.Element {
  return <></>
}
