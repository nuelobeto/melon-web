import {AccountSetUpLayout} from '@/components/layouts/account-setup-layout';
import {Button} from '@/components/ui/button';
import {ROUTES} from '@/router/routes';
import {useNavigate} from 'react-router-dom';

export const BusinessOnboardingSuccess = () => {
  const navigate = useNavigate();

  return (
    <AccountSetUpLayout>
      <div className="w-full pt-16 px-5">
        <div className="w-full max-w-[600px] mx-auto rounded-lg bg-white border border-mountainAsh-6 p-16 flex flex-col items-center">
          <img
            src="/images/businessSuccess.png"
            alt=""
            width={117}
            height={117}
          />
          <h1 className="font-medium text-2xl text-pashBlack-1 text-center mt-6">
            Your account registration is complete!
          </h1>
          <p className="text-base text-pashBlack-5 text-center mt-2">
            We will take a few moment to verify your details and send you a
            confirmation mail when verification is complete
          </p>
          <Button
            size={'lg'}
            className="w-full max-w-[510px] mt-7"
            onClick={() => navigate(ROUTES.home)}
          >
            Okay
          </Button>
        </div>
      </div>
    </AccountSetUpLayout>
  );
};
