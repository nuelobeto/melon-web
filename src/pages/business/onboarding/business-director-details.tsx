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
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '@/router/routes';
import {useBusiness} from '@/store/useBusiness';
import {ApiResponseT, CountryCodeType, UpdateDirectorDetailsT} from '@/types';
import {useEffect, useState} from 'react';
import {Loader2} from 'lucide-react';
import {CountryCode} from '@/components/ui/country-code';
import businessServices from '@/services/business';
import {toast} from 'react-toastify';
import {useFetchDirectorsDetails} from '@/hooks/business';

export const BusinessDirectorDetails = () => {
  const {business, directorsDetails} = useBusiness();
  const navigate = useNavigate();
  const [selectedCountryCode, setSelectedCountryCode] =
    useState<CountryCodeType | null>(null);
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    first_name: z.string().min(1, {
      message: 'Please enter your first name',
    }),
    last_name: z.string().min(1, {
      message: 'Please enter your last name',
    }),
    email: z
      .string()
      .min(1, {message: 'Please enter your business email.'})
      .email({message: 'Please enter a valid email address.'}),
    phone_number: z.string().min(1, {
      message: 'Please enter your phone number.',
    }),
    address: z.string().min(1, {
      message: 'Please enter your address',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      address: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!business) {
      return;
    }

    const payload: UpdateDirectorDetailsT = {
      first_name: values.first_name,
      last_name: values.last_name,
      phone_number: `${
        selectedCountryCode?.callingCode
      }${values.phone_number.slice(1)}`,
      email: values.email,
      address: values.address,
    };

    setLoading(true);
    setLoading(true);
    try {
      const res: ApiResponseT = await businessServices.updateDirectorDetails(
        payload,
      );
      if (res.status === 'success') {
        setLoading(false);
        toast.success(res.message);
        navigate(ROUTES.verifyDirectorPhone);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    form.reset({
      first_name: directorsDetails[0]?.first_name ?? '',
      last_name: directorsDetails[0]?.last_name ?? '',
      email: directorsDetails[0]?.email ?? '',
      phone_number: directorsDetails[0]?.phone_number ?? '',
      address: directorsDetails[0]?.address ?? '',
    });
  }, [directorsDetails, form]);

  useFetchDirectorsDetails();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-5">
        <PageHeader
          title="Director's details"
          subtitle="Give us more details about your business"
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
                    <Input {...field} className="h-12" />
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
              name="address"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} className="h-12" />
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
