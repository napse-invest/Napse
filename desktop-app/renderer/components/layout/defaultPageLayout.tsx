import { ReactNode } from 'react'

export default function DefaultPageLayout({
  children,
  header,
  description
}: {
  children: ReactNode
  header: string
  description: string
}): JSX.Element {
  return (
    <div className="mt-12 space-y-6 align-middle">
      <div className="container mt-12 space-y-6 align-middle">
        <h1 className="text-5xl font-bold leading-tight tracking-tighter">
          {header}
        </h1>
        <p className="text-xl">{description}</p>
      </div>
      <div className="container">{children}</div>
    </div>
  )
}
