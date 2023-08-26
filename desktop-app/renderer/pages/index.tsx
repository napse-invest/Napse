import Link from 'next/link'

export default function Index(): JSX.Element {
  return (
    <Link href="/providers">
      <a className="btn-blue">Enter App</a>
    </Link>
  )
}
