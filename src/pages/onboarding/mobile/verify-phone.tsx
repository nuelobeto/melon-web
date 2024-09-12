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

export const VerifyPhoneMobile = () => {
  const formSchema = z.object({
    pin: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pin: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="w-screen h-screen bg-white flex justify-center px-5 py-16">
      <div className="flex flex-col w-full max-w-[400px]">
        <h1 className="font-medium text-2xl text-pashBlack-1 mb-2">
          Verify your phone number
        </h1>
        <p className="text-pashBlack-5 mb-8">
          Enter the 4 digit code sent to the phone number ending 9087
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="pin"
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

            <Button type="submit" className="w-full mt-6">
              Submit
            </Button>

            <div className="flex items-center justify-center gap-1">
              <p>Didn’t receive code?</p>
              <button className="text-pink-1">Resend</button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
