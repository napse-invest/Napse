import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

export type simpleCurrencyData = {
  ticker: string
  value: number
}

export default function SimpleCurrencyDataTable({
  data
}: {
  data: simpleCurrencyData[]
}): JSX.Element {
  const sortedData = data.sort((a, b) => b.value - a.value)
  const slicedData = sortedData.slice(0, 3)

  return (
    <Table>
      <TableHeader className="">
        <TableRow>
          <TableHead className="">Ticker</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {slicedData.map((currency) => (
          <TableRow key={currency.ticker}>
            <TableCell className="font-medium">{currency.ticker}</TableCell>
            <TableCell className="text-right">
              ${currency.value.toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
