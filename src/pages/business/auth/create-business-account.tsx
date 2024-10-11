/* eslint-disable @typescript-eslint/no-explicit-any */
import {AuthLayout, Main, SideBar} from '@/components/layouts/auth-layout';
import {Loader2} from 'lucide-react';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {CountryCode} from '@/components/ui/country-code';
import {ApiResponseT, CountryCodeType, CreateBusinessT} from '@/types';
import {useState} from 'react';
import {Checkbox} from '@/components/ui/checkbox';
import {Link, useNavigate} from 'react-router-dom';
import {ROUTES} from '@/router/routes';
import authServices from '@/services/auth';
import {toast} from 'react-toastify';
import {
  emailSchema,
  passwordSchema,
  phoneNumberSchema,
  stringSchema,
} from '@/helpers/zod-schema';
import {ScrollArea} from '@/components/ui/scroll-area';

export const CreateBusinessAccount = () => {
  return (
    <AuthLayout>
      <SideBar />
      <Main>
        <ScrollArea className="w-full h-full">
          <div className="w-full h-full max-w-[500px] pt-32 px-5 pb-20 mx-auto">
            <RegistrationForm />
          </div>
        </ScrollArea>
      </Main>
    </AuthLayout>
  );
};

const RegistrationForm = () => {
  const [selectedCountryCode, setSelectedCountryCode] =
    useState<CountryCodeType | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formSchema = z
    .object({
      business_name: stringSchema('Please enter your business name.'),
      business_email: emailSchema('Please enter your business email.'),
      phone_number: phoneNumberSchema(
        'Please enter your business phone number.',
      ),
      password: passwordSchema('Enter your password.'),
      confirm_password: passwordSchema('Confirm your password.'),
      agree_to_terms: z.boolean().refine(val => val === true, {
        message: 'You must agree to the terms.',
      }),
    })
    .refine(data => data.password === data.confirm_password, {
      path: ['confirm_password'], // This indicates the field to show the error on
      message: 'Passwords must match',
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      business_name: '',
      business_email: '',
      phone_number: '',
      password: '',
      confirm_password: '',
      agree_to_terms: true,
    },
    mode: 'onBlur',
  });

  const emailValue = form.getValues('business_email');

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const payload: CreateBusinessT = {
      name: values.business_name,
      email: values.business_email,
      phone_number: `+${
        selectedCountryCode?.callingCode
      }${values.phone_number.slice(1)}`,
      password: values.password,
      add_terms_cond: values.agree_to_terms,
    };

    setLoading(true);
    try {
      const res: ApiResponseT = await authServices.createBusinessAccount(
        payload,
      );
      if (res.status === 'success') {
        setLoading(false);
        navigate(ROUTES.verifyBusinessAccount.replace(':email', emailValue));
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response?.data?.message ?? 'Error creating business');
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-4xl text-pashBlack-1 text-center">
            Create your Melon account
          </h1>
          <p className="text-base text-pashBlack-3 text-center">
            Let’s get started. Create an account to begin
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="business_name"
            render={({field}) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter business name"
                    {...field}
                    className="h-12"
                  />
                </FormControl>
                <FormDescription>
                  *If your business is registered, please input your registered
                  business name
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
            name="phone_number"
            render={({field}) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <div className="relative flex items-center">
                    <CountryCode
                      selectedCountryCode={selectedCountryCode}
                      setSelectedCountryCode={setSelectedCountryCode}
                    />
                    <Input
                      type="tel"
                      placeholder="Enter your phone number"
                      className="pl-16 h-12"
                      {...field}
                      maxLength={11}
                    />
                  </div>
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
          <FormField
            control={form.control}
            name="confirm_password"
            render={({field}) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    {...field}
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="agree_to_terms"
          render={({field}) => (
            <FormItem>
              <div className="flex flex-row items-center gap-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="font-normal">
                  I agree to Melon terms of use and privacy policy
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col items-center gap-2">
          <Button type="submit" className="h-12 w-full" disabled={loading}>
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Create account'
            )}
          </Button>
          <p className="font-medium text-sm text-pashBlack-4 text-center">
            Have an account?{' '}
            <Link to={ROUTES.businessSignIn} className="text-darkLime-5">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};
