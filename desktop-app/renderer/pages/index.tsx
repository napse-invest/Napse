import Link from 'next/link'

export default function Index(): JSX.Element {
  return (
    <>
      <Link href="/providers">
        Enter App
      </Link>
      <br />
      <Link href="/spaces">
        Enter Spaces
      </Link>
    </>
  )
}
