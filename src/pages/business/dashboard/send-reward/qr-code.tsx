import {ScrollArea} from '@/components/ui/scroll-area';
import {useFetchBusiness} from '@/hooks/useQueries';
import {ROUTES} from '@/router/routes';
import {useAuth} from '@/store/useAuth';
import {QRCodeSVG} from 'qrcode.react';
import {useEffect, useState} from 'react';

export const QrCode = () => {
  const {user} = useAuth();
  const {data: business} = useFetchBusiness({
    businessId: user?.business_id as string,
  });
  const apiKey = business?.data?.plain_key;
  const storeName = business?.data?.details?.name;
  const [qrCodeValue, setQrCodeValue] = useState<string | null>(null);

  useEffect(() => {
    const generateQrCode = () => {
      setQrCodeValue(
        `https://melon-app.vercel.app${ROUTES.customerReward
          .replace(':api_key', apiKey)
          .replace(':name', encodeURIComponent(storeName))}`,
      );
    };
    generateQrCode();
  }, [apiKey, storeName]);

  return (
    <div className="w-full h-[calc(100%-102px-24px)] bg-white rounded-3xl mt-6">
      <ScrollArea className="w-full h-full">
        <div className="py-10 px-11">
          <div className="space-y-1">
            <h1 className="text-3xl font-medium text-pashBlack-1">QR Code</h1>
            <p className="text-sm text-pashBlack-7">
              QR Code for your customers can scan to earn their reward points
            </p>
          </div>

          <div className="mt-12 rounded-[28px] bg-mountainAsh-9 p-[22px] w-[345px] mx-auto">
            <div className="w-full aspect-square bg-white flex items-center justify-center">
              {qrCodeValue ? (
                <QRCodeSVG value={qrCodeValue} size={249.59} />
              ) : (
                <p className="text-pashBlack-7">No QR code generated</p>
              )}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
