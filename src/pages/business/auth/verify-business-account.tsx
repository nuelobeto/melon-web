/* eslint-disable @typescript-eslint/no-explicit-any */
import {AuthLayout, Main, SideBar} from '@/components/layouts/auth-layout';
import authServices from '@/services/auth';
import {ApiResponseT} from '@/types';
import {Loader2} from 'lucide-react';
import {useState} from 'react';
import {useParams} from 'react-router-dom';
import {toast} from 'react-toastify';

export const VerifyBusinessAccount = () => {
  const params = useParams();
  const email = params.email;
  const [loading, setLoading] = useState(false);

  const handleResendEmail = async () => {
    if (!email) {
      return;
    }

    setLoading(true);
    try {
      const res: ApiResponseT = await authServices.resendBusinessEmailOtp(
        email,
      );
      if (res.status === 'success') {
        setLoading(false);
        toast.success(res.message);
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response?.data?.message ?? 'Error sending link');
    }
  };

  return (
    <AuthLayout>
      <SideBar />
      <Main>
        <div className="w-full h-full mx-auto max-w-[500px] px-5 flex flex-col items-center justify-center gap-6">
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

          <p className="font-medium text-sm text-pashBlack-4 text-center flex items-center justify-center gap-1">
            Didn't get the link?{' '}
            <button
              className="text-darkLime-5 text-base"
              onClick={handleResendEmail}
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Resend'}
            </button>
          </p>
        </div>
      </Main>
    </AuthLayout>
  );
};
