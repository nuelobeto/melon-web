import {DashboardLayout} from '@/components/layouts/dashboard';
import {PageTitle} from '../registered-business';
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
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '@/router/routes';

const formSchema = z.object({
  otp: z.string().min(2, {
    message: 'Pin must be 4 characters.',
  }),
});

export const VerifyOwner = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    navigate(ROUTES.unRegisteredBusinessRegistration);
  }

  return (
    <DashboardLayout pageTitle={<PageTitle />}>
      <div className="w-full h-[calc(100vh-64px)] px-7 py-9 bg-[#F5F6F8] flex items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-[520px] py-9 px-11 rounded-3xl bg-white"
          >
            <div className="space-y-1.5">
              <h1 className="text-3xl font-medium text-pashBlack-1 text-center">
                Verify phone number
              </h1>
              <p className="text-sm text-pashBlack-4 text-center max-w-[316px] mx-auto">
                Enter the four digit code sent to your phone number to verify
                your account
              </p>
            </div>

            <FormField
              control={form.control}
              name="otp"
              render={({field}) => (
                <FormItem className="w-full max-w-[253px] mx-auto flex justify-center mt-11">
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

            <Button type="submit" size={'lg'} className="w-full mt-9">
              Verify
            </Button>

            <div className="flex items-center justify-center text-center gap-1 font-medium mt-[14px]">
              <p className="text-pashBlack-4">Didn’t receive code?</p>{' '}
              <button className="text-pink-1">Resend</button>
            </div>
          </form>
        </Form>
      </div>
    </DashboardLayout>
  );
};
