import { RetrievedNapseSpace } from '@/api/spaces/spaces'
import { Operation } from '@/api/wallets/wallets'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import { DataTableViewOptions } from '@/components/ui/data-table-column-toggle'
import { DataTablePagination } from '@/components/ui/data-table-pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useState } from 'react'

const operationColumns: ColumnDef<Operation>[] = [
  {
    accessorKey: 'ticker',
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Ticker" className="" />
      )
    },
    cell: ({ row }) => (
      <div className=" uppercase">{row.getValue('ticker')}</div>
    )
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Amount" className="" />
      )
    },
    cell: ({ row }) => (
      <div className=" uppercase">{row.getValue('amount')}</div>
    )
  },
  {
    accessorKey: 'operation_type',
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Amount" className="" />
      )
    },
    cell: ({ row }) => (
      <div className=" uppercase">{row.getValue('operation_type')}</div>
    )
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Date" className="" />
    },
    cell: ({ row }) => {
      let date = new Date(row.getValue('created_at')).toLocaleDateString()
      return <div className="">{date}</div>
    }
  }
]

interface DataTableProps {
  data: Operation[]
  columns: ColumnDef<Operation>[]
}

export default function OperationDataTable({
  space
}: {
  space: RetrievedNapseSpace
}): JSX.Element {
  let data = space ? space['wallet']['operations'] : []
  let columns = operationColumns

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility
    }
  })

  return (
    <div className="">
      <DataTableViewOptions table={table} />
      <div className="mt-4 rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div> */}
      <div className="mt-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  )
}
