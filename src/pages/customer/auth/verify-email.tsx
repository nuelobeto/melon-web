/* eslint-disable @typescript-eslint/no-explicit-any */
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import authServices from '@/services/auth';
import {Loader2} from 'lucide-react';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {toast} from 'react-toastify';

export const VerifyEmailMobile = () => {
  const params = useParams();
  const token = params.token;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [resendingOtp, setResendingOtp] = useState(false);

  const verifyEmail = async (token: string) => {
    setLoading(true);
    try {
      const res = await authServices.verifyEmail(token);
      if (res.status === 'success') {
        setLoading(false);
        setSuccess(true);
      }
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  const FormSchema = z.object({
    email: z.string().min(1, {
      message: 'Email is required',
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    resendEmailOtp(values.email);
  }

  const resendEmailOtp = async (email: string) => {
    setResendingOtp(true);
    try {
      const res = await authServices.resendEmailOtp(email);
      if (res.status === 'success') {
        setResendingOtp(false);
        toast.success('Link sent successfully!');
      }
    } catch (error: any) {
      console.log(error);
      setResendingOtp(false);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token]);

  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center px-5">
      {loading && (
        <div className="flex flex-col items-center">
          <Loader2 className="animate-spin w-10 h-10 text-darkLime-4" />
        </div>
      )}

      {!loading && success && (
        <div className="flex flex-col items-center">
          <img
            src="/images/success.png"
            alt=""
            width={100}
            height={100}
            className="mb-6"
          />
          <div className="w-full max-w-[241px]">
            <h1 className="font-medium text-2xl text-pashBlack-1 text-center mb-2">
              Email Address verified
            </h1>
            <p className="text-pashBlack-5 text-center">
              Your email address has been successfully verified
            </p>
          </div>
        </div>
      )}

      {!loading && error && (
        <div className="flex flex-col items-center">
          <img
            src="/images/404.jpg"
            alt=""
            width={200}
            height={200}
            className="mb-6"
          />
          <div className="w-full max-w-[350px]">
            <h1 className="font-medium text-2xl text-pashBlack-1 text-center mb-2">
              An error occured
            </h1>
            <p className="text-pashBlack-5 text-center mb-6">
              Enter your email below to get a new verification link.
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Email address"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={resendingOtp}
                >
                  {resendingOtp ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    'Resend link'
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};
