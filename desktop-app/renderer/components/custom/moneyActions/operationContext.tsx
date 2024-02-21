import { ReactNode, createContext, useContext, useState } from 'react'

export const OperationContext = createContext<{
  triggerRefresh: boolean
  setTriggerRefresh: React.Dispatch<React.SetStateAction<boolean>>
}>({
  triggerRefresh: false,
  setTriggerRefresh: () => {}
})

export const useOperationContext = () => useContext(OperationContext)

export const OperationProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [triggerRefresh, setTriggerRefresh] = useState(false)

  return (
    <OperationContext.Provider value={{ triggerRefresh, setTriggerRefresh }}>
      {children}
    </OperationContext.Provider>
  )
}
