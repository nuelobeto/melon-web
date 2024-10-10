/* eslint-disable @typescript-eslint/no-explicit-any */
import {DashboardLayout} from '@/components/layouts/dashboard-layout';
import {CartesianGrid, Line, LineChart, XAxis} from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {useEffect, useState} from 'react';
import {ApiResponseT, TotalPatronageT, TransactionT} from '@/types';
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
import {Button} from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Download, EllipsisVerticalIcon, Eye, X} from 'lucide-react';
import {ScrollArea} from '@/components/ui/scroll-area';
import {useFetchBusiness} from '@/hooks/business';
import {toast} from 'react-toastify';
import businessServices from '@/services/business';
import {format} from 'date-fns';

export const Home = () => {
  useFetchBusiness();

  return (
    <DashboardLayout pageTitle="Dashboard">
      <OffersBanner />

      <div className="flex flex-col min-[1100px]:flex-row gap-4 mt-8 px-5">
        <TotalPatronage />
        {/* <Overview /> */}
      </div>

      <RecentEngagements />
    </DashboardLayout>
  );
};

const OffersBanner = () => {
  return (
    <div className="md:pt-5 md:px-5">
      <div className="w-full md:rounded-xl bg-gradient-to-r from-pink-400 via-pink-500 to-red-500 px-6 sm:px-12 p-6 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-5 bg-black rounded-full transform rotate-45"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        <img
          src="/images/campaign-coming-soon.png"
          alt=""
          width={150}
          className="w-[100px] md:w-[150px] h-auto"
        />
        <div className="flex flex-col max-w-[600px] gap-2">
          <h2 className="font-semibold text-2xl text-white text-center md:text-left">
            Offers Coming Soon!
          </h2>
          <p className="text-sm md:text-base text-center text-white md:text-left">
            Something big is on the horizon! Our upcoming campaign is set to
            launch soon, and you won’t want to miss out. Stay tuned for
            exclusive offers and exciting surprises!
          </p>
          <Button className="w-full md:w-fit mt-2 relative z-10">
            Learn more
          </Button>
        </div>
      </div>
    </div>
  );
};

const TotalPatronage = () => {
  const [chartData, setChartData] = useState<TotalPatronageT[]>([]);
  const [timeRange, setTimeRange] = useState('month');

  const formattedChartData = chartData.map((d: TotalPatronageT) => {
    return {
      ...d,
      date: format(new Date(d.date), 'yyyy-MM-dd'),
      month: format(new Date(d.date), 'MMM dd'),
    };
  });

  const totalCumulativePoints = chartData.reduce((total, item) => {
    return total + parseFloat(item.cumulative_points);
  }, 0);

  const chartConfig = {
    total_receipts: {
      label: 'Total receipt',
      color: '#FA5EA1',
    },
  } satisfies ChartConfig;

  const getTotalPatronage = async (filter: string) => {
    try {
      const res: ApiResponseT = await businessServices.getTotalPatronage(
        filter,
      );
      setChartData(res.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getTotalPatronage(timeRange);
  }, [timeRange]);

  return (
    <Card className="flex-[2] bg-mountainAsh-10 border-mountainAsh-7">
      <CardHeader className="flex items-start gap-2 space-y-0 p-4 flex-row">
        <div className="grid flex-1 gap-1 text-left">
          <CardTitle className="text-lg text-pashBlack-1">
            Total Patronage
          </CardTitle>
          <CardDescription>
            Total number of users that have made purchases
          </CardDescription>
          <p className="text-lg font-medium">{totalCumulativePoints}</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[130px] rounded-lg">
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3 month">Last 3 months</SelectItem>
            <SelectItem value="month">Last 30 days</SelectItem>
            <SelectItem value="week">Last 7 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="p-4">
        <ChartContainer config={chartConfig} className="w-full max-h-[250px]">
          <LineChart
            accessibilityLayer
            data={formattedChartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={value => value.slice(0, 6)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="total_receipts"
              type="natural"
              stroke="var(--color-total_receipts)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

// const Overview = () => {
//   const [timeRange, setTimeRange] = useState('90d');

//   const data = [
//     {
//       label: 'Total customers',
//       value: '20,000',
//     },
//     {
//       label: 'New customers',
//       value: '20,000',
//     },
//     {
//       label: 'Returning customers',
//       value: '20,000',
//     },
//   ];

//   return (
//     <Card className="flex-1 border-mountainAsh-7">
//       <CardHeader className="flex items-center gap-2 space-y-0 p-4 flex-row">
//         <div className="grid flex-1 gap-1 text-left">
//           <CardTitle className="text-lg text-pashBlack-1">Overview</CardTitle>
//         </div>
//         <Select value={timeRange} onValueChange={setTimeRange}>
//           <SelectTrigger className="w-[130px] rounded-lg">
//             <SelectValue placeholder="Last 3 months" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="90d">Last 3 months</SelectItem>
//             <SelectItem value="30d">Last 30 days</SelectItem>
//             <SelectItem value="7d">Last 7 days</SelectItem>
//           </SelectContent>
//         </Select>
//       </CardHeader>

//       <CardContent className="p-4">
//         {data.map((customer, index) => (
//           <div
//             key={index}
//             className="py-4 border-b border-mountainAsh-7 flex items-center justify-between"
//           >
//             <p className="text-pashBlack-1 text-sm">{customer.label}</p>
//             <p className="text-pashBlack-1 text-sm">{customer.value}</p>
//           </div>
//         ))}
//       </CardContent>
//     </Card>
//   );
// };

const RecentEngagements = () => {
  const [data, setData] = useState<TransactionT[]>([]);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionT | null>(null);

  const handleOpenTransaction = (transaction: TransactionT) => {
    setOpenDetails(true);
    setSelectedTransaction(transaction);
  };

  const handleCloseTransaction = () => {
    setOpenDetails(false);
    setSelectedTransaction(null);
  };

  const columns: ColumnDef<TransactionT>[] = [
    {
      accessorKey: 'receipt_id',
      header: 'Transaction ID',
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({row}) => (
        <p className="text-pashBlack-5">NGN {row.getValue('amount')}</p>
      ),
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({row}) => (
        <p>{formatDateToCustomTimestamp(row.getValue('date'))}</p>
      ),
    },
    {
      accessorKey: 'point_type',
      header: 'Transaction Type',
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({row}) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 hover:bg-neutral-50"
              >
                <EllipsisVerticalIcon className="w-5 h-5 text-pashBlack-7" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[213px]">
              <DropdownMenuItem
                onClick={() => handleOpenTransaction(row.original)}
              >
                <Eye className="w-5 h-5 mr-2" />
                View details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={e => e.stopPropagation()}>
                <Download className="w-5 h-5 mr-2" />
                Export
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
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
      setData(res.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getRecentEngagement();
  }, []);

  return (
    <>
      <div className="mt-6 px-5 mb-16">
        <h3 className="font-semibold text-lg text-pashBlack-1">
          Recent Engagements
        </h3>

        <div className="mt-4 rounded-lg border border-mountainAsh-6 overflow-auto">
          <div className="w-full min-w-[600px]">
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
                          className="whitespace-nowrap"
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
                      onClick={() => handleOpenTransaction(row.original)}
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
        </div>
      </div>
      <TransactionDetails
        open={openDetails}
        onClose={handleCloseTransaction}
        transaction={selectedTransaction}
      />
    </>
  );
};

const TransactionDetails = ({
  open,
  onClose,
  transaction,
}: {
  open: boolean;
  onClose: () => void;
  transaction: TransactionT | null;
}) => {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetTrigger className="hidden"></SheetTrigger>
      <SheetContent className="h-[calc(100%-48px)] my-auto w-full max-w-[600px] px-6 py-0 border-0 shadow-none bg-transparent">
        <div className="w-full h-full bg-white rounded-lg">
          <SheetHeader className="flex-row items-center px-5 h-[64px] border-b border-mountainAsh-6 justify-between space-y-0">
            <SheetTitle>Transaction Details</SheetTitle>
            <SheetClose asChild>
              <Button
                size={'icon'}
                variant={'secondary'}
                className="w-8 h-8 rounded-full"
              >
                <X className="w-4 h-4 text-pashBlack-6" />
              </Button>
            </SheetClose>
            <SheetDescription className="hidden"></SheetDescription>
          </SheetHeader>

          <ScrollArea className="h-[calc(100%-64px)]">
            <div className="p-5">
              <div className="flex flex-col gap-2">
                <h2 className="text-pashBlack-1 text-base">
                  Transaction ID: {transaction?.receipt_id}
                </h2>
                <p className="text-pashBlack-1 text-sm">
                  Date: {transaction?.created_at}
                </p>
                <p className="text-pashBlack-1 text-sm">
                  Transaction Type: transaction?.point_type
                </p>
              </div>

              <div className="w-full overflow-auto mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="whitespace-nowrap">S/N</TableHead>
                      <TableHead className="whitespace-nowrap">Item</TableHead>
                      <TableHead className="whitespace-nowrap">
                        Quantity
                      </TableHead>
                      <TableHead className="whitespace-nowrap">
                        Amount
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transaction?.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="whitespace-nowrap">
                          {index + 1}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {item.item}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {item.quantity}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          NGN {item.amount}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};
