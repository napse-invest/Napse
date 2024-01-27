import { Cluster } from '@/api/fleets/fleets'
import CustomTable from '@/components/custom/table'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

export default function ClusterDataTable({
  data = []
}: {
  data: Cluster[]
}): JSX.Element {
  const clusterColumns: ColumnDef<Cluster>[] = [
    {
      accessorKey: 'templateBot',
      header: () => <div className="text-center">Bots</div>,
      cell: ({ row }) => (
        <div className="">
          {(row.getValue('templateBot') as { name: string }).name}
        </div>
      )
    },
    {
      accessorKey: 'share',
      header: ({ column }) => {
        return (
          <div className="flex flex-row justify-around">
            <div></div>
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              Share
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )
      },
      cell: ({ row }) => <div className="">{row.getValue('share')}</div>
    }
  ]
  return <CustomTable data={data} columns={clusterColumns} />
}
