import Link from 'next/link'

export default function Index(): JSX.Element {
  return (
    <Link href="/home">
      <a className="btn-blue">Go to home page</a>
    </Link>
  )
}
