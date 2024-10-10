/* eslint-disable @typescript-eslint/no-explicit-any */
import {AuthLayout, Main, SideBar} from '@/components/layouts/auth-layout';
import {Button} from '@/components/ui/button';
import {useNavigate, useParams} from 'react-router-dom';
import {ROUTES} from '@/router/routes';
import authServices from '@/services/auth';
import {toast} from 'react-toastify';
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
        toast.success(res.message);
        hasMutated.current = false;
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message ?? 'Invalid link');
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
      <SideBar>
        <div className="flex flex-col gap-16">
          <h2 className="font-medium text-3xl bg-gradient-to-r from-[#FF4DAE] via-[#E2A26A] to-[#C3FF1E] text-transparent bg-clip-text">
            Modern loyalty and campaign management platform for your business
          </h2>
        </div>
      </SideBar>
      <Main>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-3xl text-pashBlack-1 text-center">
              Account verified!
            </h1>
            <p className="text-sm text-pashBlack-3 text-center">
              Your email has been verified, and your account is now fully
              activated. You can now start exploring all the features and
              benefits we offer.
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
          </div>
        </div>
      </Main>
    </AuthLayout>
  );
};
