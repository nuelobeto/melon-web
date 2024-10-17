// import {Button} from '@/components/ui/button';
// import {openWidget, StoreConfigType, MelonReceiptType} from 'melon-web-widget';
// import 'melon-web-widget/dist/index.css';

// export const SendCustomerReceipt = () => {
//   const handleOpenWidget = () => {
//     const store: StoreConfigType = {
//       store_logo:
//         'https://res.cloudinary.com/dk9bt9lkn/image/upload/v1704231822/qudra/vue_zjazcr.png',
//       api_key: 'BBszTq94xd61szHBD',
//       store_name: 'obetoandsons',
//     };

//     const payload: MelonReceiptType = {
//       reference: 'REF20',
//       items: [
//         {
//           item: 'Watermelon',
//           amount: 4000,
//           quantity: 1,
//         },
//         {
//           item: 'Banana',
//           amount: 4000,
//           quantity: 1,
//         },
//       ],
//       date: '2024-09-26',
//       total_amount: 8000,
//     };
//     openWidget(store, payload);
//   };

//   return (
//     <div className="w-screen h-screen flex items-center justify-center">
//       <div id="melon-widget" />
//       <Button onClick={handleOpenWidget}>Open Melon Widget</Button>
//     </div>
//   );
// };

import 'react-toastify/dist/ReactToastify.css';
import {Card, CardContent, CardFooter, CardHeader} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useState} from 'react';
import {format} from 'date-fns';
import {Loader2, Plus, Trash2} from 'lucide-react';
import {Calendar as CalendarIcon} from 'lucide-react';
import {cn} from '@/lib/utils';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {ReceiptItemT, MelonReceiptT} from '@/types';
import {Label} from '@radix-ui/react-label';
import {useParams} from 'react-router-dom';
import api from '@/services';
import {DashboardLayout} from '@/components/layouts/dashboard-layout';

export const SendCustomerReceipt = () => {
  const [melonId, setMelonId] = useState('');
  const [storeName, setStoreName] = useState('');
  const [reference, setReference] = useState('');
  const [date, setDate] = useState<Date>();
  const [items, setItems] = useState<ReceiptItemT[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const params = useParams();
  const apiKey = params.api_key;

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

  const handleSendReceipt = async () => {
    if (!apiKey) {
      return console.log('No api key');
    }

    const payload: MelonReceiptT = {
      melon_id: melonId,
      store_name: storeName,
      reference: reference,
      items: items,
      date: format(date!, 'yyyy-MM-dd'),
      total_amount: Number(calculateTotalAmount().toFixed(2)),
    };
    setLoading(true);
    try {
      const res = await api.sendReceipt(payload, apiKey);
      if (res.status === 'success') {
        setLoading(false);
        setSuccess(true);
        console.log(payload);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <DashboardLayout pageTitle="Dashboard">
      <Card className="w-full max-w-[500px] mx-auto border shadow-none xs:border mt-10">
        <CardHeader className="flex flex-row items-center justify-center">
          <img src="/images/logo.png" alt="" width={150} />
        </CardHeader>
        {!success && (
          <>
            <CardContent className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <Label>Melon ID or Phone number</Label>
                <Input
                  placeholder="MELO12 or +2348012345678"
                  value={melonId}
                  onChange={e => setMelonId(e.target.value)}
                  required
                  className="placeholder:text-pashBlack-8"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Store name</Label>
                <Input
                  value={storeName}
                  onChange={e => setStoreName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Referrence</Label>
                <div className="flex items-center gap-2">
                  <Input
                    value={reference}
                    onChange={e => setReference(e.target.value)}
                    required
                  />
                  <Button
                    variant={'secondary'}
                    className="border"
                    onClick={generateReferenceNumber}
                  >
                    Generate
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
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
                      onSelect={setDate}
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
                      <th className="text-xs px-4 py-2.5 text-left">
                        QUANTITY
                      </th>
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
            </CardContent>
            <CardFooter className="w-full">
              <Button
                className="w-full"
                onClick={handleSendReceipt}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin text-pashBlack-1" />
                ) : (
                  'Send Receipt'
                )}
              </Button>
            </CardFooter>
          </>
        )}

        {success && (
          <CardContent className="flex flex-col items-center pt-6">
            <img src="/images/success.png" alt="" width={60} height={60} />
            <h1 className="text-center text-pashBlack-1 text-[18px] font-semibold mt-3 mb-1">
              Success!
            </h1>
            <p>Receipt sent successfully.</p>
          </CardContent>
        )}
      </Card>
    </DashboardLayout>
  );
};
