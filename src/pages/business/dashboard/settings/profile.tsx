/* eslint-disable @typescript-eslint/no-explicit-any */
// import {Card} from '@/components/ui/card';
// import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {Edit3Icon, Loader2} from 'lucide-react';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Detail, ProfileDetails} from '@/components/ui/profile-details';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {ScrollArea} from '@/components/ui/scroll-area';
import {useBusiness} from '@/store/useBusiness';
import {useFetchPersonalDetails} from '@/hooks/business';
import {ApiResponseT, CountryCodeType, UpdatePersonalDetailsT} from '@/types';
import businessServices from '@/services/business';
import {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import {useAuth} from '@/store/useAuth';
import {CountryCode} from '@/components/ui/country-code';

export const ProfileSettings = () => {
  const {personalDetails} = useBusiness();

  const profileInfo: Detail[] = [
    {
      label: 'First name',
      value: personalDetails?.first_name ?? null,
    },
    {
      label: 'Last Name',
      value: personalDetails?.last_name ?? null,
    },
    {
      label: 'Email',
      value: personalDetails?.email ?? null,
    },
    {
      label: 'Phone Number',
      value: personalDetails?.phone_number ?? null,
    },
  ];

  useFetchPersonalDetails();

  return (
    <>
      <h2 className="font-semibold text-2xl text-pashBlack-1 mb-7">
        My Profile
      </h2>
      <div className="flex flex-col gap-6 pb-12 w-full max-w-[700px]">
        {/* <Card className="w-full flex flex-col items-center p-6 gap-3 h-fit">
          <div className="w-[150px] h-[150px] rounded-full border border-mountainAsh-1 border-dashed p-1">
            <Avatar className="w-full h-full">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="text-4xl">CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex items-center gap-3">
            <Button variant={'secondary'} className="text-xs border">
              <Trash2 className="w-4 h-4 mr-1.5" /> Remove
            </Button>
            <Button className="bg-pashBlack-1 hover:bg-pashBlack-1 text-white border-pashBlack-1 text-xs">
              <Edit3Icon className="w-4 h-4 mr-1.5" />
              Edit
            </Button>
          </div>
        </Card> */}

        <ProfileDetails
          title="Profile Information"
          details={profileInfo}
          edit={<EditPersonalInfo />}
        />
      </div>
    </>
  );
};

const EditPersonalInfo = () => {
  const {user} = useAuth();
  const {personalDetails, setPersonalDetails} = useBusiness();
  const [selectedCountryCode, setSelectedCountryCode] =
    useState<CountryCodeType | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    first_name: z.string().min(1, {
      message: 'Please enter your first name',
    }),
    last_name: z.string().min(1, {
      message: 'Please enter your last name',
    }),
    email: z
      .string()
      .min(1, {message: 'Please enter your email.'})
      .email({message: 'Please enter a valid email address.'}),
    phone_number: z.string().min(1, {
      message: 'Please enter your phone number.',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: personalDetails?.first_name ?? '',
      last_name: personalDetails?.last_name ?? '',
      email: personalDetails?.email ?? '',
      phone_number: personalDetails?.phone_number ?? '',
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
        toast.success(res.message);
        setOpen(false);
        getPersonalDetails(user.member_id);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  const getPersonalDetails = async (member_id: string) => {
    try {
      const res: ApiResponseT = await businessServices.getPersonalDetails(
        member_id,
      );
      if (res.status === 'success') {
        setPersonalDetails(res.data);
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ?? 'Error fetching personal details',
      );
    }
  };

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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="flex flex-row items-center gap-1">
        <Edit3Icon className="w-4 h-4 mr-1.5 text-pashBlack-1" />
        <span className="text-sm font-medium text-pashBlack-1">Edit</span>
      </SheetTrigger>
      <SheetContent className="h-[calc(100%-48px)] my-auto w-full max-w-[600px] px-6 py-0 border-0 shadow-none bg-transparent">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full h-full bg-white rounded-lg"
          >
            <SheetHeader className="flex-row items-center px-5 h-[64px] border-b border-mountainAsh-6 justify-between space-y-0">
              <SheetTitle>Profile Information</SheetTitle>
              <SheetDescription className="hidden"></SheetDescription>
            </SheetHeader>

            <ScrollArea className="h-[calc(100%-64px-72px)]">
              <div className="p-5 flex flex-col gap-5">
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
            </ScrollArea>

            <div className="h-[72px] flex flex-row items-center justify-end gap-4 px-5 py-4 border-t border-mountainAsh-6 space-x-0">
              <SheetClose asChild>
                <Button type="button" variant={'secondary'}>
                  Cancel
                </Button>
              </SheetClose>
              <Button type="submit" disabled={loading} className="w-[155.41px]">
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Update Information'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
