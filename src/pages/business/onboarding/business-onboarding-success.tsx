import {AccountSetUpLayout} from '@/components/layouts/account-setup-layout';
import {Button} from '@/components/ui/button';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {ROUTES} from '@/router/routes';

export const BusinessOnboardingSuccess = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

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
            onClick={() => setSuccess(true)}
          >
            Okay
          </Button>
        </div>
      </div>

      <AlertDialog open={success} onOpenChange={setSuccess}>
        <AlertDialogTrigger className="hidden"></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-pashBlack-1">
              Integrate Melon Widget
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-pashBlack-6">
              Integrate our widget into your website or mobile app to enhance
              user engagement and streamline operations. It's quick and easy to
              get started!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              variant={'secondary'}
              onClick={() => {
                setSuccess(false);
                navigate(ROUTES.home);
              }}
            >
              Do This Later
            </Button>
            <AlertDialogAction asChild>
              <Button onClick={() => navigate(ROUTES.guides)}>
                Go to Integration Guide
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AccountSetUpLayout>
  );
};
