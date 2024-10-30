import {DashboardLayout} from '@/components/layouts/dashboard';
import {ArrowLeft, ChevronDown} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
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
import {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {PointTypeT} from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {format} from 'date-fns';
import {DateRange} from 'react-day-picker';
import {cn} from '@/lib/utils';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Pagination} from '@/components/ui/pagination';

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
  {
    id: '6',
    date: '2024-11-01T08:45:30.120Z',
    transaction_id: 'TXN123461',
    melon_id: 'MEL123461',
    amount: '175000',
    point_type: 'offer',
  },
  {
    id: '7',
    date: '2024-11-02T10:32:55.640Z',
    transaction_id: 'TXN123462',
    melon_id: 'MEL123462',
    amount: '225000',
    point_type: 'standard',
  },
  {
    id: '8',
    date: '2024-11-03T13:15:47.890Z',
    transaction_id: 'TXN123463',
    melon_id: 'MEL123463',
    amount: '275000',
    point_type: 'offer',
  },
  {
    id: '9',
    date: '2024-11-04T15:02:39.210Z',
    transaction_id: 'TXN123464',
    melon_id: 'MEL123464',
    amount: '350000',
    point_type: 'standard',
  },
  {
    id: '10',
    date: '2024-11-05T17:28:11.490Z',
    transaction_id: 'TXN123465',
    melon_id: 'MEL123465',
    amount: '400000',
    point_type: 'offer',
  },
];

export const Transactions = () => {
  const [data, setData] = useState<TransactionT[]>(transactions);
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [amount, setAmount] = useState('');
  const [pointType, setPointType] = useState<PointTypeT | ''>('');

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

  const clearFilters = () => {
    setDate(undefined);
    setAmount('');
    setPointType('');
  };

  useEffect(() => {
    setData(transactions);
  }, []);

  return (
    <DashboardLayout pageTitle={<PageTitle />}>
      <div className="w-full min-h-full px-7 py-9 bg-[#F5F6F8]">
        <div className="p-6 rounded-[20px] bg-white">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-pashBlack-1">
              All Transactions
            </h1>
            <Button>Download Report</Button>
          </div>

          <div className="p-4 rounded-lg bg-[#F5F6F8] mt-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={'outline'}
                    className={cn(
                      'min-w-[100px] w-fit text-left font-normal justify-between px-3 hover:bg-white',
                      !date && 'text-muted-foreground',
                    )}
                  >
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, 'LLL dd, y')} -{' '}
                          {format(date.to, 'LLL dd, y')}
                        </>
                      ) : (
                        format(date.from, 'LLL dd, y')
                      )
                    ) : (
                      <span>Date</span>
                    )}

                    <ChevronDown className="w-5 h-5 ml-2" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>

              <Select value={amount} onValueChange={setAmount}>
                <SelectTrigger className="min-w-[110px] w-fit">
                  <SelectValue placeholder="Amount" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1000-100000">
                    NGN 1,000 - NGN 100,000
                  </SelectItem>
                  <SelectItem value="110000-1000000">
                    NGN 110,000 - NGN 1,000,000
                  </SelectItem>
                  <SelectItem value="above 1000000">
                    Above NGN 1,000,000
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={pointType}
                onValueChange={value => setPointType(value as PointTypeT)}
              >
                <SelectTrigger className="min-w-[125px] w-fit">
                  <SelectValue placeholder="Point Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="offer">Offer</SelectItem>
                  <SelectItem value="referal">Referral</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant={'secondary'} onClick={clearFilters}>
              Clear Filter
            </Button>
          </div>

          <div className="w-full min-w-[600px] mt-6 rounded-2xl border overflow-auto">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map(headerGroup => (
                  <TableRow
                    className="hover:bg-mountainAsh-8"
                    key={headerGroup.id}
                  >
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
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
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

          <div className="mt-8">
            <Pagination
              totalPages={10}
              currentPage={1}
              onPageChange={() => {}}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const PageTitle = () => {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate(-1)}>
        <ArrowLeft className="w-5 h-5" />
      </button>
      <span>Transactions</span>
    </>
  );
};
