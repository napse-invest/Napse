import { Provider } from 'react-redux'
import type { ProviderProps } from 'react-redux'
export default function ReduxProvider({
  children,
  ...props
}: ProviderProps): JSX.Element {
  return <Provider {...props}>{children}</Provider>
}
