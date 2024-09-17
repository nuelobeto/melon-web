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
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import authServices from '@/services/auth';
import {ROUTES} from '@/router/routes';
import {Loader2} from 'lucide-react';

export const VerifyPhoneMobile = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const savedPhone: string | null = localStorage.getItem('phone');
  const parsedPhone: string | null = savedPhone ? JSON.parse(savedPhone) : null;
  const [resendingOtp, setResendingOtp] = useState(false);

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
      const res = await authServices.verifyPhone(otp);
      if (res.status === 'success') {
        setLoading(false);
        navigate(ROUTES.downloadApp);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    if (parsedPhone) {
      setResendingOtp(true);
      try {
        const res = await authServices.resendOtp(parsedPhone);
        if (res.status === 'success') {
          setResendingOtp(false);
        }
      } catch (error: any) {
        toast.error(error.response.data.message);
        setResendingOtp(false);
      }
    }
  };

  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center px-5 py-16">
      <div className="flex flex-col w-full max-w-[350px]">
        <h1 className="font-medium text-2xl text-pashBlack-1 mb-2 text-center">
          Verify your phone number
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
              <button type="button" className="text-pink-1" onClick={resendOtp}>
                {resendingOtp ? <Loader2 className="animate-spin" /> : 'Resend'}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
