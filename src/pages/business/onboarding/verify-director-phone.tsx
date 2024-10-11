/* eslint-disable @typescript-eslint/no-explicit-any */
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {InputOTP, InputOTPGroup, InputOTPSlot} from '@/components/ui/input-otp';
import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {ROUTES} from '@/router/routes';
import {Loader2} from 'lucide-react';
import {ApiResponseT} from '@/types';
import businessServices from '@/services/business';
import {LogoBlack} from '@/components/ui/logo';

export const VerifyDirectorPhone = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [resendingOtp, setResendingOtp] = useState(false);
  const params = useParams();
  const phone = params.phone;

  const formSchema = z.object({
    otp: z.string().min(2, {
      message: 'Pin must be 4 characters.',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    verifyPhone(values.otp);
  }

  const verifyPhone = async (otp: string) => {
    setLoading(true);
    try {
      const res: ApiResponseT = await businessServices.verifyDirectorPhone(otp);
      if (res.status === 'success') {
        setLoading(false);
        navigate(ROUTES.businessOnboardingSuccess);
      }
    } catch (error: any) {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    if (phone) {
      setResendingOtp(true);
      try {
        const res: ApiResponseT = await businessServices.resendOtp(phone);
        if (res.status === 'success') {
          setResendingOtp(false);
        }
      } catch (error: any) {
        setResendingOtp(false);
      }
    }
  };

  return (
    <div className="w-screen h-screen bg-white">
      <header className="w-screen py-12 fixed left-0 top-0 flex items-center justify-center px-5 z-50 bg-white">
        <LogoBlack />
      </header>
      <main className="w-screen h-screen pt-36 flex justify-center">
        <div className="flex flex-col w-full max-w-[350px]">
          <h1 className="font-medium text-2xl text-pashBlack-1 mb-2 text-center">
            Verify director's phone number
          </h1>
          <p className="text-pashBlack-5 mb-8 text-center">
            Enter the 4 digit code sent to your phone number
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="otp"
                render={({field}) => (
                  <FormItem className="w-full max-w-[253px] mx-auto flex justify-center">
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full mt-6" disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : 'Verify'}
              </Button>

              <div className="flex items-center justify-center gap-1">
                <p>Didn’t receive code?</p>
                <button
                  type="button"
                  className="text-pink-1"
                  onClick={resendOtp}
                >
                  {resendingOtp ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    'Resend'
                  )}
                </button>
              </div>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
};
