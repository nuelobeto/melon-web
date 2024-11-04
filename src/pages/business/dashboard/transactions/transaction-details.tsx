import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {ScrollArea} from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {TransactionT} from '@/types';
import {X} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {formatDateToCustomTimestamp} from '@/helpers';

type Props = {
  transaction: TransactionT | null;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TransactionDetails = ({transaction, open, setOpen}: Props) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="hidden"></SheetTrigger>
      <SheetContent className="bg-transparent border-0 shadow-none p-6 w-full max-w-[600px]">
        <div className="w-full h-full bg-white rounded-xl">
          <SheetHeader className="px-6 h-[64px] flex-row items-center justify-between border-b border-mountainAsh-6 space-y-0">
            <SheetTitle>Transaction Details</SheetTitle>
            <SheetClose>
              <Button
                size={'icon'}
                className="rounded-full bg-mountainAsh-8 hover:bg-mountainAsh-6 border-mountainAsh-5"
              >
                <X className="w-5 h-5 text-pashBlack-5" />
              </Button>
            </SheetClose>
          </SheetHeader>

          <ScrollArea className="w-fulkl h-[calc(100%-64px)]">
            <div className="p-6">
              <div className="text-sm text-pashBlack-4 space-y-1.5">
                <p>
                  <span className="text-pashBlack-1 font-semibold">
                    Transaction ID:
                  </span>{' '}
                  {transaction?.receipt_id}
                </p>
                <p>
                  <span className="text-pashBlack-1 font-semibold">
                    Melon ID:
                  </span>{' '}
                  {transaction?.melon_id}
                </p>
                <p>
                  <span className="text-pashBlack-1 font-semibold">
                    Amount:
                  </span>{' '}
                  ₦ {transaction?.amount}
                </p>
                <p>
                  <span className="text-pashBlack-1 font-semibold">
                    Point Type:
                  </span>{' '}
                  <Badge variant={transaction?.point_type}>
                    {transaction?.point_type}
                  </Badge>
                </p>
                <p>
                  <span className="text-pashBlack-1 font-semibold">Date:</span>{' '}
                  {formatDateToCustomTimestamp(transaction?.created_at ?? '')}
                </p>
              </div>

              <div className="mt-6 space-y-2">
                <h3 className="text-pashBlack-1 font-semibold text-lg">
                  Purchased Items
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transaction?.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.item}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.amount}</TableCell>
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
