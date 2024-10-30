/* eslint-disable @typescript-eslint/no-explicit-any */
import {LogoWhite} from '@/components/ui/logo';
import {ScrollArea} from '@/components/ui/scroll-area';
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
import {Link, useNavigate} from 'react-router-dom';
import {ROUTES} from '@/router/routes';
import {Eye, EyeOff, Loader2} from 'lucide-react';
import {ApiResponseT, LoginT} from '@/types';
import {useEffect, useState} from 'react';
import authServices from '@/services/auth';
import {useAuth} from '@/store/useAuth';
import {useFetchBusiness} from '@/hooks/business';
import {useBusiness} from '@/store/useBusiness';
import {emailSchema, passwordSchema} from '@/helpers/zod-schema';

const formSchema = z.object({
  business_email: emailSchema('Please enter your business email.'),
  password: passwordSchema(),
});

export const BusinessSignIn = () => {
  const {setUser} = useAuth();
  const {business} = useBusiness();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowpassword] = useState(false);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      business_email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const payload: LoginT = {
      email: values.business_email,
      password: values.password,
    };

    setLoading(true);
    try {
      const res: ApiResponseT = await authServices.login(payload);

      if (res.status === 'success') {
        setLoading(false);
        setSuccess(true);
        setUser(res.data.member);
      }
    } catch (error: any) {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!success || !business) return;

    setSuccess(false);

    if (!business.profile_completed) {
      navigate(ROUTES.getStarted);
    } else {
      navigate(ROUTES.home);
    }
  }, [business, navigate, success]);

  useFetchBusiness();

  return (
    <main className="w-screen h-screen bg-[#081623] bg-[url('/images/auth-bg.svg')] bg-no-repeat bg-cover">
      <ScrollArea className="w-full h-full">
        <div className="w-full h-full py-[124px] px-6">
          <LogoWhite className="w-[199.2px] mb-[49px] mx-auto" />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full max-w-[550px] mx-auto flex flex-col gap-6 px-5 sm:px-[46px] py-[39px] rounded-3xl bg-white"
            >
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold text-3xl lg:text-4xl text-pashBlack-1 text-center">
                  Welcome Back!
                </h1>
                <p className="text-sm text-pashBlack-4 text-center">
                  Log In to your account to continue.
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
                <FormField
                  control={form.control}
                  name="password"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Enter Password</FormLabel>
                      <FormControl>
                        <div className="flex items-center relative">
                          <Input
                            type={!showPassword ? 'password' : 'text'}
                            placeholder="Enter password"
                            {...field}
                            className="h-12 pr-9"
                          />
                          <button
                            type="button"
                            className="absolute right-2.5"
                            onClick={() => setShowpassword(!showPassword)}
                          >
                            {!showPassword ? (
                              <Eye className="w-5 h-5 text-pashBlack-8" />
                            ) : (
                              <EyeOff className="w-5 h-5 text-pashBlack-8" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center gap-1 text-sm">
                  <span className="text-pashBlack-3">Forgot password?</span>
                  <Link
                    to={ROUTES.forgotBusinessPassword}
                    className="text-pink-1 underline"
                  >
                    Reset here
                  </Link>
                </div>
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
                    'Log In'
                  )}
                </Button>
                <p className="font-medium text-sm text-pashBlack-4 text-center">
                  New to Melon?{' '}
                  <Link
                    to={ROUTES.createBusinessAccount}
                    className="text-pashBlack-1"
                  >
                    Create an account
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
