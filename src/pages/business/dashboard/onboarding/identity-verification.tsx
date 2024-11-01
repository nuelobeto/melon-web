/* eslint-disable @typescript-eslint/no-explicit-any */
import {emailSchema, phoneNumberSchema} from '@/helpers/zod-schema';
import {zodResolver} from '@hookform/resolvers/zod';
import {useEffect, useState} from 'react';
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
import {ScrollArea} from '@/components/ui/scroll-area';
import {CountryCodeType, UpdatePersonalDetailsT} from '@/types';
import {CountryCode} from '@/components/ui/country-code';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '@/router/routes';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useFetchBusiness} from '@/hooks/useQueries';
import {useAuth} from '@/store/useAuth';
import businessServices from '@/services/business';
import {toast} from 'react-toastify';
import {Loader2} from 'lucide-react';

const formSchema = z.object({
  first_name: z.string().min(1, {
    message: 'Enter first name',
  }),
  last_name: z.string().min(1, {
    message: 'Enter last name',
  }),
  email: emailSchema('Enter email address'),
  phone_number: phoneNumberSchema('Enter phone number'),
  country: z.string().min(1, {
    message: 'Enter country',
  }),
  state: z.string().min(1, {
    message: 'Enter state',
  }),
  city: z.string().min(1, {
    message: 'Enter city',
  }),
  street: z.string().min(1, {
    message: 'Enter street',
  }),
});

export const IdentityVerification = () => {
  const queryClient = useQueryClient();

  const {user} = useAuth();
  const {data: business} = useFetchBusiness({
    businessId: user?.business_id as string,
  });

  const [selectedCountryCode, setSelectedCountryCode] =
    useState<CountryCodeType | null>(null);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      country: '',
      state: '',
      city: '',
      street: '',
    },
  });

  const {mutate, status} = useMutation({
    mutationFn: businessServices.updatePersonalDetails,
    onSuccess: () => {
      navigate(
        ROUTES.verifyOwnerPhone.replace(
          ':phone',
          `${selectedCountryCode?.callingCode}${form.getValues(
            'phone_number',
          )}`,
        ),
      );
      queryClient.invalidateQueries({
        queryKey: ['business'],
      });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });

  const isBtnActive =
    !!form.watch('first_name') &&
    !!form.watch('last_name') &&
    !!form.watch('email') &&
    !!form.watch('phone_number') &&
    !!form.watch('country') &&
    !!form.watch('state') &&
    !!form.watch('city') &&
    !!form.watch('street');

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
      return;
    }

    const payload: UpdatePersonalDetailsT = {
      details: {
        first_name: values.first_name,
        last_name: values.last_name,
        phone_number: `+${
          selectedCountryCode?.callingCode
        }${values.phone_number.slice(1)}`,
        email: values.email,
        state: values.state,
        country: values.country,
        city: values.city,
        street: values.street,
      },
      member_id: user.member_id,
    };

    mutate(payload);
  }

  useEffect(() => {
    if (business && business.data && business.data.personal_details) {
      form.reset({
        first_name: business.data.personal_details.first_name ?? '',
        last_name: business.data.personal_details.last_name ?? '',
        email: business.data.personal_details.email ?? '',
        phone_number: business.data.personal_details.phone_number
          ? business.data.personal_details.phone_number.replace(/^(\+234)/, '0')
          : '',
        country: business.data.personal_details.country ?? '',
        state: business.data.personal_details.state ?? '',
        city: business.data.personal_details.city ?? '',
        street: business.data.personal_details.street ?? '',
      });
    }
  }, [business, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full h-full bg-white rounded-3xl mt-6"
      >
        <ScrollArea className="w-full h-[calc(100%-85px)]">
          <div className="py-10 px-11">
            <div className="space-y-1">
              <h1 className="text-3xl font-medium text-pashBlack-1">
                Identity Verification
              </h1>
              <p className="text-sm text-pashBlack-7">Verify your Identity</p>
            </div>

            <div className="mt-6 space-y-6">
              <FormField
                control={form.control}
                name="first_name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter first name"
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
                name="last_name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter last name"
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
                name="email"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter email address"
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
                          placeholder="Enter phone number"
                          {...field}
                          className="pl-16 h-12"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-1">
                <h1 className="text-3xl font-medium text-pashBlack-1">
                  Address
                </h1>
                <p className="text-sm text-pashBlack-7">Enter address</p>
              </div>

              <FormField
                control={form.control}
                name="country"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-12"
                        placeholder="Enter country"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-12"
                        placeholder="Enter state"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-12"
                        placeholder="Enter city"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="street"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Street</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-12"
                        placeholder="Enter street"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </ScrollArea>

        <div className="py-5 px-11 border-t border-mountainAsh-6">
          <Button
            type="submit"
            size={'lg'}
            className="w-full"
            disabled={!isBtnActive || status === 'pending'}
          >
            {status === 'pending' ? (
              <Loader2 className="animate-spin" />
            ) : (
              'Continue'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
