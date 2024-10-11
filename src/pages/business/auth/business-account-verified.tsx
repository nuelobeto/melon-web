/* eslint-disable @typescript-eslint/no-explicit-any */
import {AuthLayout, Main, SideBar} from '@/components/layouts/auth-layout';
import {Button} from '@/components/ui/button';
import {useNavigate, useParams} from 'react-router-dom';
import {ROUTES} from '@/router/routes';
import authServices from '@/services/auth';
import {useEffect, useRef} from 'react';
import {ApiResponseT} from '@/types';

export const BusinessAccountVerified = () => {
  const navigate = useNavigate();
  const params = useParams();
  const token = params.token;
  const hasMutated = useRef(false);

  const verifyEmail = async (token: string) => {
    try {
      const res: ApiResponseT = await authServices.verifyBusinessEmail(token);
      if (res.status === 'success') {
        hasMutated.current = false;
      }
    } catch (error: any) {
      hasMutated.current = false;
    }
  };

  useEffect(() => {
    if (token && !hasMutated.current) {
      verifyEmail(token);
      hasMutated.current = true;
    }
  }, [token]);

  return (
    <AuthLayout>
      <SideBar />

      <Main>
        <div className="w-full h-full mx-auto max-w-[500px] px-5 flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-3xl text-pashBlack-1 text-center">
              Account verified!
            </h1>
            <p className="text-base text-pashBlack-3 text-center">
              Your email has been verified, and your account is now fully
              activated. You can now start exploring all the features and
              benefits we offer.
            </p>
          </div>

          <Button
            type="submit"
            className="h-12 w-full"
            onClick={() => navigate(ROUTES.businessSignIn)}
          >
            Log In
          </Button>
        </div>
      </Main>
    </AuthLayout>
  );
};
