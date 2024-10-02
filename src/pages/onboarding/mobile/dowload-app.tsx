import {Button} from '@/components/ui/button';

export const DowloadApp = () => {
  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center px-5 py-16">
      <div className="flex flex-col items-center">
        <img
          src="/images/create-account-success.png"
          alt=""
          width={100}
          height={100}
          className="mb-6"
        />
        <div className="w-full max-w-[300px]">
          <h1 className="font-medium text-2xl text-pashBlack-1 text-center mb-2">
            Congratulations
          </h1>
          <p className="text-pashBlack-5 text-center">
            Click the button below to download the app and claim your reward.
          </p>
          <div className="flex flex-col gap-2 mt-8">
            <Button className="bg-darkLime-1 text-white h-12 justify-start hover:bg-darkLime-1/95 border-darkLime-1 gap-3">
              <img src="/images/apple.png" alt="" width={24} height={24} />
              Get it on App Store
            </Button>
            <Button className="bg-darkLime-1 text-white h-12 justify-start hover:bg-darkLime-1/95 border-darkLime-1 gap-3">
              <img src="/images/playstore.png" alt="" width={24} height={24} />
              Get it on Play Store
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
