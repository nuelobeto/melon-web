/* eslint-disable @typescript-eslint/no-explicit-any */
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {ScrollArea} from '@/components/ui/scroll-area';
import {MelonReceiptT, ReceiptItemT, SendRewardT} from '@/types';
import {format} from 'date-fns';
import {useEffect, useState} from 'react';
import {Calendar as CalendarIcon, Loader2, Plus, Trash2} from 'lucide-react';
import {cn} from '@/lib/utils';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import businessServices from '@/services/business';
import {useFetchBusiness} from '@/hooks/useQueries';
import {useAuth} from '@/store/useAuth';
import {toast} from 'react-toastify';
import {useMutation} from '@tanstack/react-query';

export const Manual = () => {
  const {user} = useAuth();
  const {data: business} = useFetchBusiness({
    businessId: user?.business_id as string,
  });

  const [melonId, setMelonId] = useState('');
  const [storeName, setStoreName] = useState('');
  const [reference, setReference] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [items, setItems] = useState<ReceiptItemT[]>([]);
  const api_key = business?.data?.plain_key as string;
  const STORENAME = business?.data?.details?.name;

  const generateReferenceNumber = () => {
    const timestamp = Date.now();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setReference(`REF-${timestamp}-${randomNum}`);
  };

  const addItem = () => {
    const newItem: ReceiptItemT = {
      item: '',
      quantity: 1,
      amount: 0,
    };
    setItems([...items, newItem]);
  };

  const handleItemChange = (
    index: number,
    key: keyof ReceiptItemT,
    value: string | number,
  ) => {
    const updatedItems = items.map((item, i) =>
      i === index ? {...item, [key]: value} : item,
    );
    setItems(updatedItems);
  };

  const deleteItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const calculateTotalAmount = () => {
    return items.reduce((total, item) => {
      if (item.quantity > 0 && item.amount > 0) {
        return total + item.quantity * item.amount;
      }
      return total;
    }, 0);
  };

  const {mutate, status} = useMutation({
    mutationFn: businessServices.sendReceipt,
    onSuccess: () => {
      toast.success('Point rewards sent');
      setMelonId('');
      setReference('');
      setDate(new Date());
      setItems([]);
      generateReferenceNumber();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });

  const handleSendReceipt = async () => {
    if (!api_key) {
      return console.log('No api key');
    }

    const receipt: MelonReceiptT = {
      melon_id: melonId,
      store_name: storeName,
      reference: reference,
      items: items,
      date: format(date!, 'yyyy-MM-dd'),
      total_amount: Number(calculateTotalAmount().toFixed(2)),
    };

    const payload: SendRewardT = {
      receipt,
      api_key,
    };

    mutate(payload);
  };

  useEffect(() => {
    generateReferenceNumber();
  }, []);

  useEffect(() => {
    if (STORENAME) {
      setStoreName(STORENAME);
    }
  }, [STORENAME]);

  return (
    <div className="w-full h-[calc(100%-102px-24px)] bg-white rounded-3xl mt-6">
      <ScrollArea className="w-full h-[calc(100%-85px)]">
        <div className="py-10 px-11">
          <div className="space-y-1">
            <h1 className="text-3xl font-medium text-pashBlack-1">
              Generate Manually
            </h1>
            <p className="text-sm text-pashBlack-7">
              Fill in the details of the transaction so your customer can get
              their reward points
            </p>
          </div>

          <div className="mt-6 space-y-6">
            <div className="flex flex-col gap-2">
              <Label>Customer's Melon ID</Label>
              <Input
                placeholder="Enter Customers melon ID"
                value={melonId}
                onChange={e => setMelonId(e.target.value)}
                required
                className="placeholder:text-pashBlack-8 h-12"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Business Name</Label>
              <Input
                value={storeName}
                placeholder="Enter the name of your Business"
                onChange={e => setStoreName(e.target.value)}
                required
                className="h-12"
                disabled
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Transaction Reference</Label>
              <Input
                value={reference}
                onChange={e => setReference(e.target.value)}
                required
                className="h-12"
                disabled
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal h-12',
                      !date && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date && format(date, 'yyyy-MM-dd')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={day => {
                      if (day) setDate(day);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <h2 className="font-semibold text-lg text-pashBlack-1 my-2">
                Items Purchased
              </h2>
              <table className="w-full">
                <thead>
                  <tr className="bg-mountainAsh-6">
                    <th className="text-xs px-4 py-2.5 text-left">S/N</th>
                    <th className="text-xs px-4 py-2.5 text-left">ITEM</th>
                    <th className="text-xs px-4 py-2.5 text-left">QUANTITY</th>
                    <th className="text-xs px-4 py-2.5 text-left">AMOUNT</th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index} className="bg-mountainAsh-10 border-b">
                      <td className="text-sm px-4 py-2.5 text-left">
                        {index + 1}
                      </td>
                      <td className="px-4 py-2.5 text-left">
                        <input
                          type="text"
                          placeholder="Item"
                          value={item.item}
                          onChange={e =>
                            handleItemChange(index, 'item', e.target.value)
                          }
                          className="w-full text-sm text-pashBlack-1 outline-none bg-transparent"
                        />
                      </td>
                      <td className="px-4 py-2.5 text-left">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={e =>
                            handleItemChange(
                              index,
                              'quantity',
                              parseInt(e.target.value),
                            )
                          }
                          className="w-full text-sm text-pashBlack-1 outline-none bg-transparent"
                        />
                      </td>
                      <td className="px-4 py-2.5 text-left">
                        <input
                          type="number"
                          value={item.amount}
                          onChange={e =>
                            handleItemChange(
                              index,
                              'amount',
                              parseFloat(e.target.value),
                            )
                          }
                          className="w-full text-sm text-pashBlack-1 outline-none bg-transparent"
                        />
                      </td>
                      <td className="w-10">
                        <button
                          className="p-1 rounded-md flex items-center justify-center border hover:bg-mountainAsh-8"
                          onClick={() => deleteItem(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {items.length > 0 && (
                    <tr>
                      <td className="text-sm px-4 py-2.5 text-left font-semibold">
                        Total
                      </td>
                      <td></td>
                      <td></td>
                      <td className="text-sm px-4 py-2.5 text-left font-semibold">
                        {calculateTotalAmount().toFixed(2)}
                      </td>
                      <td></td>
                    </tr>
                  )}
                </tbody>
              </table>
              <Button
                variant={'secondary'}
                className="border mt-4"
                onClick={addItem}
              >
                <Plus className="w-5 h-5 mr-2" /> Add item
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="py-5 px-11 border-t border-mountainAsh-6">
        <Button
          type="submit"
          size={'lg'}
          className="w-full"
          onClick={handleSendReceipt}
          disabled={status === 'pending'}
        >
          {status === 'pending' ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            'Submit'
          )}
        </Button>
      </div>
    </div>
  );
};
