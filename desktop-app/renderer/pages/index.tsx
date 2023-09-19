import Link from 'next/link'

export default function Index(): JSX.Element {
  return (
    <>
      <Link href="/servers">Enter server</Link>
      <br />
      <Link href="/exchangeAccounts">Enter Exchange Accounts</Link>
      <br />
      <Link href="/spaces">Enter Spaces</Link>
      <br />
      <Link href="/fleets">Enter Fleets</Link>
      <br />
      <Link href="/bots">Enter Bots</Link>
    </>
  )
}
