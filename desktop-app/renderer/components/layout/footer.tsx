import type { ReactNode } from 'react'

const Footer = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <>
      <main>{children}</main>
    </>
  )
}

export default Footer
