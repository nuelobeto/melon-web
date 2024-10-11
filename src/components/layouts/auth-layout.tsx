import {ScrollArea} from '@/components/ui/scroll-area';
import {LogoBlack, LogoWhite} from '../ui/logo';
import {CheckCircle} from 'lucide-react';

export const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="flex w-screen h-screen">
      <header className="w-screen h-16 fixed left-0 top-0 flex items-center px-5 z-50 bg-white min-[950px]:px-6 min-[950px]:bg-transparent">
        <LogoBlack className="min-[950px]:hidden" />
        <LogoWhite className="hidden min-[950px]:block" />
      </header>
      {children}
    </div>
  );
};

export const SideBar = () => {
  return (
    <aside className="w-[550px] h-full bg-pashBlack-1 hidden min-[1000px]:block bg-[url('/images/authBg.png')] bg-no-repeat bg-contain bg-bottom">
      <ScrollArea className="w-full h-full">
        <div className="w-full h-full pt-32 px-6 pb-6">
          <SideBarContent />
        </div>
      </ScrollArea>
    </aside>
  );
};

const SideBarContent = () => {
  const welcomeTexts = [
    {
      title: 'Improve sales and revenue growth',
      description:
        'Unlock revenue growth potential with rewards and campaigns and encourage customers to increase spending and drive measurable revenue growth for your business',
    },
    {
      title: 'Increase customer engagement',
      description:
        'Create targeted rewards, campaigns, motivating customers to make more purchases and engage with your brand regularly which in turn would improve overall business revenue',
    },
    {
      title: 'Faster payment transactions and confirmations',
      description:
        'Improve smoother checkout experience, reducing cart abandonment rates and boosting customer satisfaction.',
    },
  ];

  return (
    <div className="flex flex-col gap-16">
      <h2 className="font-medium text-3xl bg-gradient-to-r from-[#FF4DAE] via-[#E2A26A] to-[#C3FF1E] text-transparent bg-clip-text">
        Launch and Manage Loyalty <br /> and campaigns seamlessly
      </h2>

      <div className="flex flex-col gap-14">
        {welcomeTexts.map((text, index) => (
          <div key={index} className="flex items-start gap-3">
            <CheckCircle className="text-pashBlack-10 mt-[6px]" />
            <div className="w-full max-w-[489px] flex flex-col gap-2">
              <h3 className="font-medium text-2xl text-pashBlack-10">
                {text.title}
              </h3>
              <p className="text-base text-pashBlack-8">{text.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Main = ({children}: {children: React.ReactNode}) => {
  return <main className="grow h-full bg-white">{children}</main>;
};
