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
import {useState} from 'react';
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
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';

export const Home = () => {
  return (
    <DashboardLayout pageTitle="Dashboard">
      <div className="w-full rounded-xl bg-mustard-8 px-6 sm:px-12 p-6 flex flex-col md:flex-row items-center gap-6">
        <img
          src="/images/campaign-coming-soon.png"
          alt=""
          width={150}
          className="w-[100px] md:w-[150px] h-auto"
        />
        <div className="flex flex-col max-w-[600px] gap-2">
          <h2 className="font-semibold text-2xl text-center md:text-left">
            Campaigns Coming Soon!
          </h2>
          <p className="text-sm md:text-base text-center text-pashBlack-3 md:text-left">
            Something big is on the horizon! Our upcoming campaign is set to
            launch soon, and you won’t want to miss out. Stay tuned for
            exclusive offers and exciting surprises!
          </p>
        </div>
      </div>

      <div className="flex flex-col min-[1100px]:flex-row gap-4 mt-8">
        <TotalPatronage />
        <Overview />
      </div>

      <RecentEngagements />
    </DashboardLayout>
  );
};

const TotalPatronage = () => {
  const [timeRange, setTimeRange] = useState('90d');

  const chartData = [
    {month: 'Sep', desktop: 130, date: '2024-09-15'},
    {month: 'Sep', desktop: 100, date: '2024-09-28'},
    {month: 'Sep', desktop: 186, date: '2024-09-29'},
    {month: 'Sep', desktop: 305, date: '2024-09-30'},
    {month: 'Oct', desktop: 237, date: '2024-10-01'},
    {month: 'Oct', desktop: 73, date: '2024-10-02'},
    {month: 'Oct', desktop: 209, date: '2024-10-03'},
    {month: 'Oct', desktop: 214, date: '2024-10-04'},
  ];

  const chartConfig = {
    desktop: {
      label: 'Desktop',
      color: '#FA5EA1',
    },
  } satisfies ChartConfig;

  const filteredData = chartData.filter(item => {
    const date = new Date(item.date);
    const now = new Date();
    let daysToSubtract = 90;
    if (timeRange === '30d') {
      daysToSubtract = 30;
    } else if (timeRange === '7d') {
      daysToSubtract = 7;
    }
    now.setDate(now.getDate() - daysToSubtract);
    return date >= now;
  });

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
          <p className="text-lg font-medium">19,000</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[130px] rounded-lg">
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="90d">Last 3 months</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="p-4">
        <ChartContainer config={chartConfig} className="w-full max-h-[250px]">
          <LineChart
            accessibilityLayer
            data={filteredData}
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
              tickFormatter={value => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="desktop"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

const Overview = () => {
  const [timeRange, setTimeRange] = useState('90d');

  const data = [
    {
      label: 'Total customers',
      value: '20,000',
    },
    {
      label: 'New customers',
      value: '20,000',
    },
    {
      label: 'Returning customers',
      value: '20,000',
    },
  ];

  return (
    <Card className="flex-1 border-mountainAsh-7">
      <CardHeader className="flex items-center gap-2 space-y-0 p-4 flex-row">
        <div className="grid flex-1 gap-1 text-left">
          <CardTitle className="text-lg text-pashBlack-1">Overview</CardTitle>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[130px] rounded-lg">
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="90d">Last 3 months</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="p-4">
        {data.map((customer, index) => (
          <div
            key={index}
            className="py-4 border-b border-mountainAsh-7 flex items-center justify-between"
          >
            <p className="text-pashBlack-1">{customer.label}</p>
            <p className="text-pashBlack-1">{customer.value}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const data: TransactionT[] = [
  {
    id: '1',
    transaction_id: 'TX-1234',
    name: 'Hal Jordan',
    amount: '100000',
    date: formatDateToCustomTimestamp(new Date()),
    status: 'received',
  },
  {
    id: '2',
    transaction_id: 'TX-5678',
    name: 'Dian Prince',
    amount: '200000',
    date: formatDateToCustomTimestamp(new Date()),
    status: 'pending',
  },
  {
    id: '3',
    transaction_id: 'TX-9012',
    name: 'Barry Allen',
    amount: '150000',
    date: formatDateToCustomTimestamp(new Date()),
    status: 'failed',
  },
];

const RecentEngagements = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const columns: ColumnDef<TransactionT>[] = [
    {
      accessorKey: 'transaction_id',
      header: 'Transaction ID',
    },
    {
      accessorKey: 'name',
      header: 'Name',
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
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({row}) => (
        <Badge variant={row.getValue('status')} className="capitalize">
          {row.getValue('status')}
        </Badge>
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

  return (
    <div className="mt-6">
      <h3 className="font-semibold text-lg text-pashBlack-1">
        Recent Engageents
      </h3>

      <div className="mt-4 flex flex-col gap-3">
        <Input
          placeholder="Search"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full max-w-[400px]"
        />

        <div className="rounded-lg border border-mountainAsh-6 overflow-auto">
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
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-2 py-4">
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
        </div>
      </div>
    </div>
  );
};
