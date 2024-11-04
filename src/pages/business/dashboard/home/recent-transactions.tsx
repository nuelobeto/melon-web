/* eslint-disable @typescript-eslint/no-explicit-any */
import {TransactionT} from '@/types';
import {formatDateToCustomTimestamp} from '@/helpers';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {ChevronRight} from 'lucide-react';
import {Badge} from '@/components/ui/badge';
import {useFetchActivities} from '@/hooks/useQueries';
import {useMemo, useState} from 'react';
import {TransactionDetails} from '../transactions/transaction-details';

export const RecentTransactions = () => {
  const {data: transactions} = useFetchActivities({page: 1});
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionT | null>(null);

  const tableData = useMemo(() => {
    return (
      transactions?.data?.results?.map((t: TransactionT) => {
        return {
          id: t.id,
          amount: t.amount,
          point_type: t.point_type,
          created_at: t.created_at,
          receipt_id: t.receipt_id,
          melon_id: t.melon_id,
          items: t.items,
        };
      }) || []
    );
  }, [transactions?.data?.results]);

  const columns: ColumnDef<TransactionT>[] = [
    {
      accessorKey: 'created_at',
      header: 'Date',
      cell: ({row}) => (
        <p>{formatDateToCustomTimestamp(row.getValue('created_at'))}</p>
      ),
    },
    {
      accessorKey: 'receipt_id',
      header: 'Transaction ID',
    },
    {
      accessorKey: 'melon_id',
      header: 'Melon ID',
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({row}) => {
        const formattedAmount = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'NGN',
          minimumFractionDigits: 0,
        }).format(row.getValue<number>('amount'));

        return <p className="text-pashBlack-5">{formattedAmount}</p>;
      },
    },

    {
      accessorKey: 'point_type',
      header: 'Point Type',
      cell: ({row}) => (
        <Badge variant={row.getValue('point_type')} className="capitalize">
          {row.getValue('point_type')}
        </Badge>
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: () => (
        <button>
          <ChevronRight className="text-pashBlack-3 stroke-[1.5px]" />
        </button>
      ),
    },
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full min-w-[600px] mt-4 rounded-2xl border overflow-auto">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow className="hover:bg-mountainAsh-8" key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <TableHead
                    key={header.id}
                    className="whitespace-nowrap font-semibold"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className="cursor-pointer"
                onClick={() => {
                  setSelectedTransaction(row.original);
                  setOpenDetails(true);
                }}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell
                    className={`whitespace-nowrap ${
                      cell.column.id === 'actions'
                        ? 'flex items-center justify-end'
                        : ''
                    }`}
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <img
                  src="/images/empty-folder.png"
                  alt=""
                  width={100}
                  height={100}
                  className="block mx-auto"
                />
                <p>No Data</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <TransactionDetails
        transaction={selectedTransaction}
        open={openDetails}
        setOpen={setOpenDetails}
      />
    </div>
  );
};
