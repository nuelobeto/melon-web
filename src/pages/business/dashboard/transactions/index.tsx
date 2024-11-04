import {DashboardLayout} from '@/components/layouts/dashboard';
import {ChevronDown} from 'lucide-react';
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
import {useEffect, useMemo, useState} from 'react';
import {Button} from '@/components/ui/button';
import {TransactionT} from '@/types';
import {format} from 'date-fns';
import {DateRange} from 'react-day-picker';
import {cn} from '@/lib/utils';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Pagination} from '@/components/ui/pagination';
import {useFetchActivities} from '@/hooks/useQueries';
import {TransactionDetails} from './transaction-details';

export const Transactions = () => {
  const [page, setPage] = useState(1);
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const {data: transactions} = useFetchActivities({
    start_date: startDate,
    end_date: endDate,
    page,
  });
  const totalPages = transactions?.data?.paginate?.totalPages || 1;
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

  const clearFilters = () => {
    setDate(undefined);
    setStartDate('');
    setEndDate('');
  };

  const downloadCSV = () => {
    const csvRows = [];
    // Add the header row
    csvRows.push(
      ['Date', 'Transaction ID', 'Melon ID', 'Amount', 'Point Type'].join(','),
    );

    // Add the data rows
    tableData.forEach((t: TransactionT) => {
      csvRows.push(
        [
          format(new Date(t.created_at), 'yyyy-MM-dd'), // Format date as needed
          t.receipt_id,
          t.melon_id,
          t.amount,
          t.point_type,
        ].join(','),
      );
    });

    // Create a CSV string
    const csvString = csvRows.join('\n');

    // Create a Blob from the CSV string
    const blob = new Blob([csvString], {type: 'text/csv'});
    const url = URL.createObjectURL(blob);

    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'transactions.csv');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (date && date.from) {
      setStartDate(format(new Date(date.from), 'yyyy-MM-dd'));
    }
    if (date && date.to) {
      setEndDate(format(new Date(date.to), 'yyyy-MM-dd'));
    }
  }, [date]);

  console.log(startDate, endDate);

  return (
    <DashboardLayout pageTitle={'Activities'}>
      <div className="w-full min-h-full px-7 py-9 bg-[#F5F6F8]">
        <div className="p-6 rounded-[20px] bg-white">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-pashBlack-1">
              All Activities
            </h1>
            <Button onClick={downloadCSV}>Download Report</Button>
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
                    disabled={{after: new Date()}}
                  />
                </PopoverContent>
              </Popover>
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

          {transactions?.data?.results?.length > 0 && (
            <div className="mt-8">
              <Pagination
                totalPages={totalPages}
                currentPage={page}
                onPageChange={setPage}
              />
            </div>
          )}
        </div>
      </div>

      <TransactionDetails
        transaction={selectedTransaction}
        open={openDetails}
        setOpen={setOpenDetails}
      />
    </DashboardLayout>
  );
};
