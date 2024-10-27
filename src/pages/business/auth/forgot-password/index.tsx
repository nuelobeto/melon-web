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
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {LogoWhite} from '@/components/ui/logo';
import {ScrollArea} from '@/components/ui/scroll-area';
import {emailSchema} from '@/helpers/zod-schema';
import {useState} from 'react';
import {Loader2} from 'lucide-react';
import {Link, useNavigate} from 'react-router-dom';
import {ROUTES} from '@/router/routes';
import {ApiResponseT} from '@/types';
import authServices from '@/services/auth';

const formSchema = z.object({
  business_email: emailSchema('Please enter your business email.'),
});

export const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      business_email: '',
    },
    mode: 'onBlur',
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const res: ApiResponseT = await authServices.forgotPassword(
        values.business_email,
      );

      if (res.status === 'success') {
        setLoading(false);
        navigate(
          ROUTES.forgotPasswordSuccess.replace(':email', values.business_email),
        );
      }
    } catch (error: any) {
      setLoading(false);
    }
  }

  return (
    <main className="w-screen h-screen bg-[#081623] bg-[url('/images/auth-bg.svg')] bg-no-repeat bg-cover">
      <ScrollArea className="w-full h-full">
        <div className="w-full h-full py-[124px] px-6">
          <LogoWhite className="w-[199.2px] mb-[49px] mx-auto" />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full max-w-[520px] mx-auto flex flex-col gap-6 px-5 sm:px-[46px] py-[39px] rounded-3xl bg-white"
            >
              <div className="flex flex-col gap-2 w-full max-w-[304px] mx-auto">
                <h1 className="font-semibold text-3xl lg:text-4xl text-pashBlack-1 text-center">
                  Forgot Password
                </h1>
                <p className="text-sm text-pashBlack-4 text-center">
                  Enter the email address you registered your account with to
                  get a password reset link
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="business_email"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Business Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter business email"
                          {...field}
                          className="h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col items-center gap-2">
                <Button
                  type="submit"
                  className="h-12 w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Get Password Reset Link'
                  )}
                </Button>
                <p className="font-medium text-sm text-pashBlack-4 text-center">
                  Remember your password?{' '}
                  <Link to={ROUTES.businessSignIn} className="text-pashBlack-1">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </ScrollArea>
    </main>
  );
};
