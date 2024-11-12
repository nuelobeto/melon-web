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
import {CountryCodeType, UpdateDirectorT} from '@/types';
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
    message: 'Enter lasts name',
  }),
  email: emailSchema('Enter email'),
  phone_number: phoneNumberSchema('Enter phone number'),
  address: z.string().min(1, {
    message: 'Enter address',
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
      address: '',
    },
  });

  const {mutate, status} = useMutation({
    mutationFn: businessServices.updateDirectorDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['business'],
      });
      setOpen(false);
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || 'Error updating director details',
      );
    },
  });

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
