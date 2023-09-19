import type { ReactNode } from 'react'

export default function Header({
  children
}: {
  children: ReactNode
}): JSX.Element {
  return (
    <>
      <main>{children}</main>
    </>
  )
}
