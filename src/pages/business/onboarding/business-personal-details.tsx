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
import {PageHeader} from '@/components/layouts/account-setup-layout';
import {useBusiness} from '@/store/useBusiness';
import {ApiResponseT, CountryCodeType, UpdatePersonalDetailsT} from '@/types';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '@/router/routes';
import {CountryCode} from '@/components/ui/country-code';
import businessServices from '@/services/business';
import {useAuth} from '@/store/useAuth';
import {useFetchPersonalDetails} from '@/hooks/business';
import {Loader2} from 'lucide-react';
import {
  emailSchema,
  phoneNumberSchema,
  stringSchema,
} from '@/helpers/zod-schema';

export const BusinessPersonalDetails = () => {
  const {user} = useAuth();
  const {personalDetails} = useBusiness();
  const navigate = useNavigate();
  const [selectedCountryCode, setSelectedCountryCode] =
    useState<CountryCodeType | null>(null);
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    first_name: stringSchema('Please enter your first name.'),
    last_name: stringSchema('Please enter your last name.'),
    email: emailSchema('Please enter your email address.'),
    phone_number: phoneNumberSchema('Please enter your phone number.'),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
      return;
    }

    const payload: UpdatePersonalDetailsT = {
      first_name: values.first_name,
      last_name: values.last_name,
      phone_number: `+${
        selectedCountryCode?.callingCode
      }${values.phone_number.slice(1)}`,
      email: values.email,
    };

    setLoading(true);
    try {
      const res: ApiResponseT = await businessServices.updatePersonalDetails(
        payload,
        user?.member_id,
      );
      if (res.status === 'success') {
        setLoading(false);
        navigate(ROUTES.businessDetails);
      }
    } catch (error: any) {
      setLoading(false);
    }
  }

  useEffect(() => {
    form.reset({
      email: personalDetails?.email ?? '',
      first_name: personalDetails?.first_name ?? '',
      last_name: personalDetails?.last_name ?? '',
      phone_number: personalDetails?.phone_number.replace(/^\+234/, '0') ?? '',
    });
  }, [
    personalDetails?.email,
    personalDetails?.first_name,
    personalDetails?.last_name,
    personalDetails?.phone_number,
    form,
  ]);

  useFetchPersonalDetails();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-5">
        <PageHeader
          title="Personal details"
          subtitle="Give us more details about yourself"
        />

        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input {...field} className="h-12" disabled />
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button type="submit" size={'lg'} disabled={loading}>
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Continue'
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
