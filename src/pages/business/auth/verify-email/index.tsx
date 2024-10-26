/* eslint-disable @typescript-eslint/no-explicit-any */
import {LogoWhite} from '@/components/ui/logo';
import {ScrollArea} from '@/components/ui/scroll-area';
import authServices from '@/services/auth';
import {ApiResponseT} from '@/types';
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
    <main className="w-screen h-screen bg-[#081623] bg-[url('/images/auth-bg.svg')] bg-no-repeat bg-cover">
      <ScrollArea className="w-full h-full">
        <div className="w-full h-full py-[124px] px-6">
          <LogoWhite className="w-[199.2px] mb-[49px] mx-auto" />

          <div className="w-full max-w-[520px] mx-auto flex flex-col gap-6 px-5 sm:px-[46px] py-[39px] rounded-3xl bg-white">
            <div className="flex flex-col gap-2">
              <h1 className="font-semibold text-3xl lg:text-4xl text-pashBlack-1 text-center">
                Verify your email address
              </h1>
              <p className="text-sm text-pashBlack-4 text-center max-w-[354px] mx-auto">
                We've sent a verification link to{' '}
                <span className="font-semibold">{email}</span>. Please click the
                link verify your account.
              </p>
            </div>

            <div className="flex items-center justify-center text-center gap-1 font-medium">
              <p className="text-pashBlack-4">Didn’t receive link?</p>{' '}
              <button
                className="text-pink-1"
                onClick={handleResendEmail}
                disabled={loading}
              >
                Resend
              </button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};
