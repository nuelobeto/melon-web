/* eslint-disable @typescript-eslint/no-explicit-any */
import {AuthLayout, Main, SideBar} from '@/components/layouts/auth-layout';
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
import {Loader2} from 'lucide-react';
import {ApiResponseT, LoginT} from '@/types';
import {useEffect, useState} from 'react';
import authServices from '@/services/auth';
import {toast} from 'react-toastify';
import {useAuth} from '@/store/useAuth';
import {useFetchBusiness} from '@/hooks/business';
import {useBusiness} from '@/store/useBusiness';

export const BusinessSignIn = () => {
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
        <RegistrationForm />
      </Main>
    </AuthLayout>
  );
};

const RegistrationForm = () => {
  const {setUser} = useAuth();
  const {business} = useBusiness();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const formSchema = z.object({
    business_email: z
      .string()
      .min(1, {message: 'Please enter your business email.'})
      .email({message: 'Please enter a valid email address.'}),
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters long',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      business_email: '',
      password: '',
    },
    mode: 'onBlur',
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
        toast.success(res.message);
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response?.data?.message ?? 'Error logging in');
    }
  }

  useFetchBusiness();

  useEffect(() => {
    if (!success || !business) return;

    setSuccess(false);

    if (!business.profile_completed) {
      navigate(ROUTES.businessOnboarding);
    } else if (
      business.profile_completed &&
      !business.director_phone_verified
    ) {
      const savedDirectorPhone: string | null =
        localStorage.getItem('director-phone');
      const directorPhone: string = savedDirectorPhone
        ? JSON.parse(savedDirectorPhone)
        : '';

      navigate(ROUTES.verifyDirectorPhone.replace(':phone', directorPhone));
    } else {
      navigate(ROUTES.home);
    }
  }, [business, navigate, success]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-4xl text-pashBlack-1 text-center">
            Welcome Back!
          </h1>
          <p className="text-base text-pashBlack-3 text-center">
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
                  <Input
                    type="password"
                    placeholder="Create a password"
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
          <Button type="submit" className="h-12 w-full" disabled={loading}>
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Log In'}
          </Button>
          <p className="font-medium text-sm text-pashBlack-4 text-center">
            New to Melon?{' '}
            <Link to={ROUTES.createBusinessAccount} className="text-darkLime-5">
              Create an ccount
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};
