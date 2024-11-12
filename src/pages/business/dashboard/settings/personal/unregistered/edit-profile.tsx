/* eslint-disable @typescript-eslint/no-explicit-any */
import {Button} from '@/components/ui/button';
import {ScrollArea} from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {RiEdit2Fill} from 'react-icons/ri';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {emailSchema, phoneNumberSchema} from '@/helpers/zod-schema';
import {CountryCodeType, UpdatePersonalDetailsT} from '@/types';
import {CountryCode} from '@/components/ui/country-code';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useFetchBusiness} from '@/hooks/useQueries';
import {useAuth} from '@/store/useAuth';
import businessServices from '@/services/business';
import {toast} from 'react-toastify';
import {Loader2} from 'lucide-react';
import {useEffect, useState} from 'react';

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

export const EditProfile = () => {
  const queryClient = useQueryClient();

  const {user} = useAuth();
  const {data: business} = useFetchBusiness({
    businessId: user?.business_id as string,
  });

  const [open, setOpen] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] =
    useState<CountryCodeType | null>(null);

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
      queryClient.invalidateQueries({
        queryKey: ['business'],
      });
      setOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });

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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="flex items-center gap-2 font-semibold text-pashBlack-1">
          <RiEdit2Fill className="text-lg" />
          Edit
        </button>
      </SheetTrigger>
      <SheetContent className="bg-transparent border-0 shadow-none p-6 w-full max-w-[600px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full h-full bg-white rounded-xl"
          >
            <SheetHeader className="px-6 h-[64px] flex-row items-center justify-between border-b border-mountainAsh-6 space-y-0">
              <SheetTitle>Edit Personal Information</SheetTitle>
              <SheetDescription className="hidden"></SheetDescription>
            </SheetHeader>

            <ScrollArea className="h-[calc(100%-64px-72px)]">
              <div className="p-6">
                <div className="space-y-5">
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

            <SheetFooter className="h-[72px] px-6 flex items-center border-t border-mountainAsh-6">
              <SheetClose asChild>
                <Button variant={'secondary'}>Cancel</Button>
              </SheetClose>
              <Button
                type="submit"
                disabled={status === 'pending'}
                className="w-[92.2px]"
              >
                {status === 'pending' ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  'Continue'
                )}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
