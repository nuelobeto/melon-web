/* eslint-disable @typescript-eslint/no-explicit-any */
import {ApiResponseT, PointTypeT} from '@/types';
import {useEffect, useState} from 'react';
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
import businessServices from '@/services/business';
import {toast} from 'react-toastify';
import {Badge} from '@/components/ui/badge';

type TransactionT = {
  id: string;
  date: string;
  transaction_id: string;
  melon_id: string;
  amount: string;
  point_type: PointTypeT;
};

const transactions: TransactionT[] = [
  {
    id: '1',
    date: '2024-10-27T07:01:28.330Z',
    transaction_id: 'TXN123456',
    melon_id: 'MEL123456',
    amount: '100000',
    point_type: 'standard',
  },
  {
    id: '2',
    date: '2024-10-28T09:15:30.530Z',
    transaction_id: 'TXN123457',
    melon_id: 'MEL123457',
    amount: '200000',
    point_type: 'offer',
  },
  {
    id: '3',
    date: '2024-10-29T11:22:45.150Z',
    transaction_id: 'TXN123458',
    melon_id: 'MEL123458',
    amount: '150000',
    point_type: 'standard',
  },
  {
    id: '4',
    date: '2024-10-30T14:05:10.780Z',
    transaction_id: 'TXN123459',
    melon_id: 'MEL123459',
    amount: '250000',
    point_type: 'offer',
  },
  {
    id: '5',
    date: '2024-10-31T16:20:05.940Z',
    transaction_id: 'TXN123460',
    melon_id: 'MEL123460',
    amount: '300000',
    point_type: 'standard',
  },
];

export const RecentTransactions = () => {
  const [data, setData] = useState<TransactionT[]>(transactions);

  const columns: ColumnDef<TransactionT>[] = [
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({row}) => (
        <p>{formatDateToCustomTimestamp(row.getValue('date'))}</p>
      ),
    },
    {
      accessorKey: 'transaction_id',
      header: 'Transaction ID',
    },
    {
      accessorKey: 'melon_id',
      header: 'Melon ID',
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({row}) => (
        <p className="text-pashBlack-5">NGN {row.getValue('amount')}</p>
      ),
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
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const getRecentEngagement = async () => {
    try {
      const res: ApiResponseT = await businessServices.getRecentEngagement();
      // setData(res.data);
      setData(transactions);
      console.log(res);
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getRecentEngagement();
  }, []);

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
    </div>
  );
};
