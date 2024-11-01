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
import {CountryCodeType, UpdateDirectorT} from '@/types';
import {CountryCode} from '@/components/ui/country-code';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '@/router/routes';
import {useFetchBusiness} from '@/hooks/useQueries';
import {useAuth} from '@/store/useAuth';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import businessServices from '@/services/business';
import {toast} from 'react-toastify';
import {Loader2} from 'lucide-react';

const formSchema = z.object({
  first_name: z.string().min(1, {
    message: 'Enter first name',
  }),
  last_name: z.string().min(1, {
    message: 'Enter lasts name',
  }),
  email: emailSchema('Enter email'),
  phone_number: phoneNumberSchema('Enter phone number'),
  address: z.string().min(1, {
    message: 'Enter address',
  }),
});

export const DirectorDetails = () => {
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
      address: '',
    },
  });

  const {mutate, status} = useMutation({
    mutationFn: businessServices.updateDirectorDetails,
    onSuccess: () => {
      navigate(
        ROUTES.verifyDirectorPhone.replace(
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
      toast.error(
        error.response?.data?.message || 'Error updating director details',
      );
    },
  });

  const isBtnActive =
    !!form.watch('first_name') &&
    !!form.watch('last_name') &&
    !!form.watch('email') &&
    !!form.watch('phone_number') &&
    !!form.watch('address');

  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload: UpdateDirectorT = {
      first_name: values.first_name,
      last_name: values.last_name,
      phone_number: `+${
        selectedCountryCode?.callingCode
      }${values.phone_number.slice(1)}`,
      email: values.email,
      address: values.address,
    };

    mutate(payload);
  }

  useEffect(() => {
    if (business && business.data && business.data.directors) {
      form.reset({
        first_name: business.data.directors.first_name ?? '',
        last_name: business.data.directors.last_name ?? '',
        phone_number: business.data.directors.phone_number
          ? business.data.directors.phone_number.replace(/^(\+234)/, '0')
          : '',
        email: business.data.directors.email ?? '',
        address: business.data.directors.street ?? '',
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
                Director's Details
              </h1>
              <p className="text-sm text-pashBlack-7">
                Give us more details about your Business Director
              </p>
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
                        placeholder="Enter director's first name"
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
                        placeholder="Enter director's last name"
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
                        placeholder="Enter director's email"
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
                          placeholder="Enter director's phone number"
                          {...field}
                          className="pl-16 h-12"
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
                      <Input
                        {...field}
                        className="h-12"
                        placeholder="Enter director's address"
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
