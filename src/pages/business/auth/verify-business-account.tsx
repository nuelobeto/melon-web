import {AuthLayout, Main, SideBar} from '@/components/layouts/auth-layout';
import {CheckCircle} from 'lucide-react';
import {useParams} from 'react-router-dom';

export const VerifyBusinessAccount = () => {
  const params = useParams();
  const email = params.email;

  return (
    <AuthLayout>
      <SideBar>
        <SideBarContent />
      </SideBar>
      <Main>
        <div className="flex flex-col gap-6">
          <img
            src="/images/emailSent.png"
            alt=""
            width={80}
            height={80}
            className="block mx-auto"
          />
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-3xl text-pashBlack-1 text-center">
              Verify your email address
            </h1>
            <p className="text-base text-pashBlack-3 text-center">
              We've sent a verification link to {email}. Please click the link
              verify your account.
            </p>
          </div>

          <p className="font-medium text-sm text-pashBlack-4 text-center">
            Didn't get the link?{' '}
            <button className="text-darkLime-5 text-base">Resend</button>
          </p>
        </div>
      </Main>
    </AuthLayout>
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
