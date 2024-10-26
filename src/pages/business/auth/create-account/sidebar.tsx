import {LogoWhite} from '@/components/ui/logo';
import {ScrollArea} from '@/components/ui/scroll-area';
import {CheckCircle} from 'lucide-react';

const welcomeTexts = [
  {
    title: 'Improve sales and revenue growth',
    description:
      'Unlock revenue growth potential with rewards and campaigns and encourage customers to increase spending and drive measurable revenue growth for your business',
  },
  {
    title: 'Improve sales and revenue growth',
    description:
      'Unlock revenue growth potential with rewards and campaigns and encourage customers to increase spending and drive measurable revenue growth for your business',
  },
  {
    title: 'Improve sales and revenue growth',
    description:
      'Unlock revenue growth potential with rewards and campaigns and encourage customers to increase spending and drive measurable revenue growth for your business',
  },
];

export const Sidebar = () => {
  return (
    <aside
      className="w-[49%] max-w-[700px] h-full bg-[#081623] hidden lg:block bg-no-repeat bg-left-bottom"
      style={{
        backgroundImage: "url('/images/sign-up-bg.svg')",
        backgroundSize: '80%',
      }}
    >
      <ScrollArea className="w-full h-full">
        <div className="w-full h-full pt-28 pb-16 px-16">
          <div className="w-full max-w-[542px]">
            <LogoWhite className="w-[109px] mb-6" />

            <h2 className="font-medium text-3xl bg-gradient-to-r from-[#FF4DAE] via-[#E2A26A] to-[#C3FF1E] text-transparent bg-clip-text mb-16">
              Launch and Manage Loyalty <br /> and campaigns seamlessly
            </h2>

            <div className="flex flex-col gap-12">
              {welcomeTexts.map((text, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="text-pashBlack-10 mt-[6px]" />
                  <div className="w-full max-w-[489px] flex flex-col gap-2">
                    <h3 className="font-medium text-2xl text-pashBlack-10">
                      {text.title}
                    </h3>
                    <p className="text-base text-pashBlack-8">
                      {text.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
};
