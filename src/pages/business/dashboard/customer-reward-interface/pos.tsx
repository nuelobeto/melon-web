/* eslint-disable @typescript-eslint/no-explicit-any */
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {ScrollArea} from '@/components/ui/scroll-area';
import {MelonReceiptT, ReceiptItemT, SendRewardT} from '@/types';
import {useEffect, useState} from 'react';
import {Loader2} from 'lucide-react';
import businessServices from '@/services/business';
import {useMutation} from '@tanstack/react-query';
import {toast} from 'react-toastify';
import {LogoBlack} from '@/components/ui/logo';

type PosReceiptT = {
  total_amount: string;
  items: ReceiptItemT[];
  timestamp: string;
  store_name: string;
  api_key: string;
};

export const PosCustomerRewardInterface = () => {
  const [melonId, setMelonId] = useState('');
  const [posReceipt, setPosReceipt] = useState<PosReceiptT | null>(null);
  const url = String(window.location);

  useEffect(() => {
    if (url) {
      const params = new URL(url).searchParams;
      const encodedData = params.get('data');

      if (encodedData) {
        try {
          const jsonData = JSON.parse(decodeURIComponent(encodedData));
          setPosReceipt(jsonData);
        } catch (error) {
          console.error('Error decoding data:', error);
        }
      }
    }
  }, [url]);

  const [reference, setReference] = useState('');

  const generateReferenceNumber = () => {
    const timestamp = Date.now();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setReference(`REF-${timestamp}-${randomNum}`);
  };

  const {mutate, status} = useMutation({
    mutationFn: businessServices.sendReceipt,
    onSuccess: () => {
      toast.success('Point rewards sent');
      setMelonId('');
      setReference('');
      generateReferenceNumber();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });

  const handleSendReceipt = async () => {
    if (!posReceipt) {
      return console.log('No api key');
    }

    const receipt: MelonReceiptT = {
      melon_id: melonId,
      store_name: posReceipt.store_name,
      reference: reference,
      items: posReceipt.items,
      date: posReceipt.timestamp,
      total_amount: Number(posReceipt.total_amount),
    };

    const payload: SendRewardT = {
      receipt,
      api_key: posReceipt.api_key,
    };

    mutate(payload);
  };

  useEffect(() => {
    generateReferenceNumber();
  }, []);

  console.log(posReceipt);

  return (
    <div className="w-screen h-screen bg-[#081623]">
      <div className="w-full h-full max-w-[400px] mx-auto bg-white">
        <header className="flex items-center justify-center px-7 h-[64px] border-b border-mountainAsh-6">
          <LogoBlack />
        </header>
        <main className="w-full h-[calc(100%-64px-72px)]">
          <ScrollArea className="w-full h-full">
            <div className="p-5">
              <div className="space-y-1">
                <h1 className="text-3xl font-medium text-pashBlack-1 mt-5">
                  Enter Your Melon ID or Phone Number
                </h1>
                <p className="text-sm text-pashBlack-7">
                  Lorem ipsum dolor sit amet consectetur.
                </p>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex flex-col gap-2">
                  <Label>Customer's Melon ID</Label>
                  <Input
                    placeholder="Enter Customers Melon ID or Phone Number"
                    value={melonId}
                    onChange={e => setMelonId(e.target.value)}
                    required
                    className="placeholder:text-pashBlack-8 h-12"
                  />
                </div>
                <div className="text-sm text-pashBlack-5 space-y-1">
                  <p>
                    <span className="text-pashBlack-1 text-base font-medium">
                      Business Name:
                    </span>{' '}
                    {posReceipt?.store_name}
                  </p>
                  <p>
                    <span className="text-pashBlack-1 text-base font-medium">
                      Refernce:
                    </span>{' '}
                    {reference}
                  </p>
                  <p>
                    <span className="text-pashBlack-1 text-base font-medium">
                      Date:
                    </span>{' '}
                    {posReceipt?.timestamp}
                  </p>
                </div>
                <div>
                  <h2 className="font-semibold text-lg text-pashBlack-1 my-2">
                    Items Purchased
                  </h2>
                  <table className="w-full">
                    <thead>
                      <tr className="bg-mountainAsh-6 text-sm">
                        <th className="text-xs px-4 py-2.5 text-left">S/N</th>
                        <th className="text-xs px-4 py-2.5 text-left">ITEM</th>
                        <th className="text-xs px-4 py-2.5 text-left">
                          QUANTITY
                        </th>
                        <th className="text-xs px-4 py-2.5 text-left">
                          AMOUNT
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {posReceipt?.items.map((item, index) => (
                        <tr
                          key={index}
                          className="bg-mountainAsh-10 border-b text-xs"
                        >
                          <td className="text-sm px-4 py-2.5 text-left">
                            {index + 1}
                          </td>
                          <td className="px-4 py-2.5 text-left">{item.item}</td>
                          <td className="px-4 py-2.5 text-left">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-2.5 text-left">
                            {item.amount}
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td className="text-sm px-4 py-2.5 text-left font-semibold">
                          Total
                        </td>
                        <td></td>
                        <td></td>
                        <td className="text-sm px-4 py-2.5 text-left font-semibold">
                          {posReceipt?.total_amount}
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </ScrollArea>
        </main>
        <footer className="flex items-center justify-center h-[72px] border-t border-mountainAsh-6 px-5">
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
        </footer>
      </div>
    </div>
  );
};
