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
import {Link, useNavigate, useParams} from 'react-router-dom';
import {ROUTES} from '@/router/routes';
import {Loader2} from 'lucide-react';
import {ResetPasswordT} from '@/types';
import authServices from '@/services/auth';
import {passwordSchema} from '@/helpers/zod-schema';
import {toast} from 'react-toastify';
import {useMutation} from '@tanstack/react-query';

const formSchema = z
  .object({
    password1: passwordSchema('Please enter your new password.'),
    password2: passwordSchema('Please confirm your new password'),
  })
  .refine(data => data.password1 === data.password2, {
    path: ['password2'], // This indicates the field to show the error on
    message: 'Passwords must match',
  });

export const ResetPassword = () => {
  const navigate = useNavigate();
  const params = useParams();
  const token = params.token;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password1: '',
      password2: '',
    },
  });

  const {mutate, status} = useMutation({
    mutationFn: authServices.resetPassword,
    onSuccess: data => {
      toast.success(data.message);
      navigate(ROUTES.login);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!token) {
      return;
    }

    const payload: ResetPasswordT = {
      token,
      password: values.password1,
    };

    mutate(payload);
  }

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
                  Reset Password
                </h1>
                <p className="text-sm text-pashBlack-4 text-center">
                  Create a new password for your account
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="password1"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Enter New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Create a new password"
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
                  name="password2"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm Password"
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
                  disabled={status === 'pending'}
                >
                  {status === 'pending' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Reset password'
                  )}
                </Button>
                <p className="font-medium text-sm text-pashBlack-4 text-center">
                  Remember your password?{' '}
                  <Link to={ROUTES.login} className="text-pashBlack-1">
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
