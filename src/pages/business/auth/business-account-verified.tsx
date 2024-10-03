import {AuthLayout, Main, SideBar} from '@/components/layouts/auth-layout';
import {Button} from '@/components/ui/button';
import {Link, useNavigate} from 'react-router-dom';
import {ROUTES} from '@/router/routes';

export const BusinessAccountVerified = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <SideBar>
        <div className="flex flex-col gap-16">
          <h2 className="font-medium text-3xl bg-gradient-to-r from-[#FF4DAE] via-[#E2A26A] to-[#C3FF1E] text-transparent bg-clip-text">
            Modern loyalty and campaign management platform for your business
          </h2>
        </div>
      </SideBar>
      <Main>
        <div className="flex flex-col gap-6">
          <img
            src="/images/create-account-success.png"
            alt=""
            width={100}
            height={100}
            className="block mx-auto"
          />
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-4xl text-pashBlack-1 text-center">
              Account created successfully
            </h1>
            <p className="text-base text-pashBlack-3 text-center">
              Hi Sundry foods, your Melon account has been created successfully.
              A member of our sales team would reach out to you and help you
              with the next steps. For now you can log Into your dashboard
            </p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Button
              type="submit"
              className="h-12 w-full"
              onClick={() => navigate(ROUTES.businessSignIn)}
            >
              Log In
            </Button>
            <p className="font-medium text-sm text-pashBlack-4 text-center">
              New to Melon?{' '}
              <Link
                to={ROUTES.createBusinessAccount}
                className="text-darkLime-5"
              >
                Create an ccount
              </Link>
            </p>
          </div>
        </div>
      </Main>
    </AuthLayout>
  );
};
