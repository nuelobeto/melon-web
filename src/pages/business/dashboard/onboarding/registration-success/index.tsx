import {Button} from '@/components/ui/button';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '@/router/routes';
import {DashboardLayout} from '@/components/layouts/dashboard';
import {PageTitle} from '../registered-business';

export const RegistrationSuccess = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout pageTitle={<PageTitle />}>
      <div className="w-full h-[calc(100vh-64px)] px-7 py-9 bg-[#F5F6F8] flex items-center justify-center">
        <div className="w-[520px] py-9 px-11 rounded-3xl bg-white">
          <div className="w-[117px] h-[117px] rounded-full mx-auto mb-[26px] flex items-center justify-center">
            <img src="/images/success.svg" alt="" width={117} height={117} />
          </div>

          <div className="space-y-1.5">
            <h1 className="text-3xl font-medium text-pashBlack-1 text-center">
              Your account registration is complete!
            </h1>
            <p className="text-sm text-pashBlack-4 text-center max-w-[366px] mx-auto">
              We will take a few moment to verify your details and send you a
              confirmation mail when verification is complete
            </p>
          </div>

          <Button
            type="submit"
            size={'lg'}
            className="w-full mt-9"
            onClick={() => navigate(ROUTES.home)}
          >
            Done
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};
