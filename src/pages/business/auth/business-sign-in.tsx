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
import {useAuth} from '@/store/useAuth';
import {useFetchBusiness} from '@/hooks/business';
import {useBusiness} from '@/store/useBusiness';
import {emailSchema, passwordSchema} from '@/helpers/zod-schema';

export const BusinessSignIn = () => {
  return (
    <AuthLayout>
      <SideBar />

      <Main>
        <div className="w-full h-full mx-auto max-w-[500px] px-5 flex flex-col items-center justify-center gap-6">
          <RegistrationForm />
        </div>
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
    business_email: emailSchema('Please enter your business email.'),
    password: passwordSchema(),
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
      }
    } catch (error: any) {
      setLoading(false);
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
        className="w-full flex flex-col gap-6"
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
