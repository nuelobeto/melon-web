import {Button} from '@/components/ui/button';
import {ScrollArea} from '@/components/ui/scroll-area';
import {QRCodeSVG} from 'qrcode.react';
import {useEffect, useState} from 'react';

export const QrCode = () => {
  const [qrCodeValue, setQrCodeValue] = useState<string | null>(null);

  const generateQrCode = () => {
    setQrCodeValue('https://your-url-or-unique-id.com');
  };

  useEffect(() => {
    generateQrCode();
  }, []);

  return (
    <div className="w-full h-[calc(100%-102px-24px)] bg-white rounded-3xl mt-6">
      <ScrollArea className="w-full h-[calc(100%-85px)]">
        <div className="py-10 px-11">
          <div className="space-y-1">
            <h1 className="text-3xl font-medium text-pashBlack-1">
              Generate QR Code
            </h1>
            <p className="text-sm text-pashBlack-7">
              Generate a customers QR Code where your customers can scan to earn
              their reward points for this transaction
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

      <div className="py-5 px-11 border-t border-mountainAsh-6">
        <Button
          type="submit"
          size={'lg'}
          className="w-full"
          onClick={generateQrCode}
        >
          Generate
        </Button>
      </div>
    </div>
  );
};
