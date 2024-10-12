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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {cn} from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {
  Asterisk,
  CheckCheck,
  ChevronDown,
  Copy,
  Edit3Icon,
  Loader2,
  Trash2,
  X,
} from 'lucide-react';
import {Checkbox} from '@/components/ui/checkbox';
import {Card} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
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
import {useState, useEffect} from 'react';
import {useBusiness} from '@/store/useBusiness';
import {
  ApiResponseT,
  CountryCodeType,
  UpdateBusinessDetailsT,
  UpdateDirectorDetailsT,
} from '@/types';
import {CountryCode} from '@/components/ui/country-code';
import {useFetchBusiness, useFetchDirectorsDetails} from '@/hooks/business';
import businessServices from '@/services/business';
import {toast} from 'react-toastify';
import {BUSINESS_CHANNELS, INDUSTRIES} from '@/constants';

export const BusinessSettings = () => {
  const {business, directorsDetails} = useBusiness();
  const [copied, setCopied] = useState(false);

  const businessInfo: Detail[] = [
    {
      label: 'cac_rc_number',
      value: business?.rc_number ?? null,
      capitilize: true,
    },
    {
      label: 'Business Name',
      value: business?.name ?? null,
      capitilize: true,
    },
    {
      label: 'Business Email',
      value: business?.business_email ?? null,
    },
    {
      label: 'Phone Number',
      value: business?.phone_number ?? null,
    },
    {
      label: 'Industry',
      value: business?.industry ?? null,
      capitilize: true,
    },
    {
      label: 'Channel',
      value: business?.channel ?? null,
      capitilize: true,
    },
    {
      label: 'Online Platforms',
      value: business?.online_channel?.length
        ? business.online_channel.join(', ')
        : null,
      capitilize: true,
    },
    {
      label: 'Website',
      value: business?.website_link ?? null,
    },
    {
      label: 'Instagram Handle',
      value: business?.instagram ?? null,
    },
    {
      label: 'Facebook',
      value: business?.facebook ?? null,
    },
    {
      label: 'Address',
      value: business?.address ?? null,
      capitilize: true,
    },
    {
      label: 'State',
      value: business?.state ?? null,
      capitilize: true,
    },
    {
      label: 'Country',
      value: business?.country ?? null,
      capitilize: true,
    },
  ];

  const directorInfo: Detail[] = [
    {
      label: 'First Name',
      value: directorsDetails.length > 0 ? directorsDetails[0].first_name : '',
      capitilize: true,
    },
    {
      label: 'Last Name',
      value: directorsDetails.length > 0 ? directorsDetails[0].last_name : '',
      capitilize: true,
    },
    {
      label: 'Phone Number',
      value:
        directorsDetails.length > 0 ? directorsDetails[0].phone_number : '',
    },
    {
      label: 'Email',
      value: directorsDetails.length > 0 ? directorsDetails[0].email : '',
    },
    {
      label: 'Address',
      value: directorsDetails.length > 0 ? directorsDetails[0].address : '',
      capitilize: true,
    },
  ];

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

  useFetchBusiness();
  useFetchDirectorsDetails();

  return (
    <>
      <h2 className="font-semibold text-2xl text-pashBlack-1 mb-7">
        Business Profile
      </h2>

      <div className="flex flex-col gap-6 pb-12 w-full max-w-[700px]">
        <Card className="p-6 text-sm font-medium text-pashBlack-1 flex items-center gap-2 relative">
          <span className="whitespace-nowrap">Api Key:</span>
          <div className="flex items-center overflow-hidden">
            {Array.from({length: 15}).map((_, index) => (
              <Asterisk key={index} className="w-4 h-4" />
            ))}
          </div>

          <button
            className="absolute right-6 bg-white p-2 border border-transparent hover:border-mountainAsh-8 rounded-md"
            onClick={() => {
              navigator.clipboard.writeText('API_KEY');
              setCopied(true);
            }}
          >
            {copied ? (
              <CheckCheck className="w-5 h-5" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </button>
        </Card>

        <Card className="w-full flex flex-col items-center p-6 gap-3 h-fit">
          <div className="w-[150px] h-[150px] rounded-full border border-mountainAsh-1 border-dashed p-1">
            <Avatar className="w-full h-full">
              <AvatarImage src={business?.logo ?? undefined} />
              <AvatarFallback className="text-4xl">
                {business?.name.charAt(0)}
              </AvatarFallback>
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
        </Card>

        <ProfileDetails
          title="Business Information"
          details={businessInfo}
          edit={<EditBusinessInfo />}
        />

        <ProfileDetails
          title="Director's Information"
          details={directorInfo}
          edit={<EditDirectorInfo />}
        />

        <ChangePassword />
      </div>
    </>
  );
};

const EditBusinessInfo = () => {
  // const [logo, setLogo] = useState<FileType | null>(null);
  const {business, setBusiness} = useBusiness();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    business_logo: z.string().optional(),
    cac_rc_number: z.string().min(1, {
      message: 'Please enter your CAC/RC Number',
    }),
    business_name: z.string().min(1, {
      message: 'Please enter business name',
    }),
    business_email: z
      .string()
      .min(1, {message: 'Please enter your business email.'})
      .email({message: 'Please enter a valid email address.'}),
    phone_number: z.string().min(1, {
      message: 'Please enter your phone number.',
    }),
    industry: z.string().min(1, {
      message: 'Please enter your business industry',
    }),
    channel: z.string().min(1, {
      message: 'Please enter your business channel',
    }),
    online_platforms: z.array(z.string()).min(1, {
      message: 'Please select at least one platform',
    }),
    website: z.string().min(1, {
      message: 'Please enter your business website',
    }),
    instagram: z.string().min(1, {
      message: 'Please enter your instagram',
    }),
    facebook: z.string().min(1, {
      message: 'Please enter your facebook',
    }),
    address: z.string().min(1, {
      message: 'Please enter your business address',
    }),
    state: z.string().min(1, {
      message: 'Please enter your state',
    }),
    country: z.string().min(1, {
      message: 'Please enter your country',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      business_logo: '',
      cac_rc_number: '',
      business_name: business?.name ?? '',
      business_email: business?.business_email ?? '',
      phone_number: business?.phone_number ?? '',
      industry: '',
      channel: '',
      online_platforms: [],
      website: '',
      instagram: '',
      facebook: '',
      address: '',
      state: '',
      country: '',
    },
  });

  const platforms = [
    {label: 'Website', value: 'website'},
    {label: 'Instagram', value: 'instagram'},
    {label: 'Facebook', value: 'facebook'},
  ] as const;

  const ALL_PLATFORMS = platforms.map(p => p.value);

  const handleDeletePlatform = (
    platformToDelete: string,
    event: React.MouseEvent,
  ) => {
    event.stopPropagation(); // Prevent the popover from opening when clicking delete
    const currentPlatforms = form.getValues('online_platforms');
    const updatedPlatforms = currentPlatforms.filter(
      platform => platform !== platformToDelete,
    );
    form.setValue('online_platforms', updatedPlatforms);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!business) {
      return;
    }

    const payload: UpdateBusinessDetailsT = {
      logo: business.logo,
      state: values.state,
      channel: values.channel,
      address: values.address,
      country: values.country,
      facebook: values.facebook,
      industry: values.industry,
      instagram: `@${values.instagram}`,
      rc_number: values.cac_rc_number,
      website_link: `https://${values.website}`,
      phone_number: values.phone_number,
      name: values.business_name,
      online_channel: values.online_platforms,
    };

    setLoading(true);
    try {
      const res: ApiResponseT = await businessServices.updateBusinessDetails(
        payload,
        business.id,
      );
      if (res.status === 'success') {
        setLoading(false);
        toast.success(res.message);
        setOpen(false);
        getBusiness(business.id);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  const getBusiness = async (business_id: string) => {
    try {
      const res: ApiResponseT = await businessServices.getBusiness(business_id);
      if (res.status === 'success') {
        setBusiness(res.data);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message ?? 'Error fetching business');
    }
  };

  useEffect(() => {
    form.reset({
      business_logo: business?.logo ?? '',
      cac_rc_number: business?.rc_number ?? '',
      industry: business?.industry ?? '',
      channel: business?.channel ?? '',
      online_platforms: business?.online_channel ?? [],
      website: business?.website_link?.replace(/^https?:\/\//, '') ?? '',
      instagram: business?.instagram?.replace(/^@/, '') ?? '',
      facebook: business?.facebook ?? '',
      address: business?.address ?? '',
      state: business?.state ?? '',
      country: business?.country ?? '',
    });
  }, [
    business?.address,
    business?.channel,
    business?.country,
    business?.facebook,
    business?.industry,
    business?.instagram,
    business?.logo,
    business?.online_channel,
    business?.rc_number,
    business?.state,
    business?.website_link,
    form,
  ]);

  useEffect(() => {
    form.reset({
      business_logo: business?.logo ?? '',
      cac_rc_number: business?.rc_number ?? '',
      industry: business?.industry ?? '',
      channel: business?.channel ?? '',
      online_platforms: business?.online_channel ?? [],
      website: business?.website_link?.replace(/^https?:\/\//, '') ?? '',
      instagram: business?.instagram?.replace(/^@/, '') ?? '',
      facebook: business?.facebook ?? '',
      address: business?.address ?? '',
      state: business?.state ?? '',
      country: business?.country ?? '',
      business_name: business?.name ?? '',
      business_email: business?.business_email ?? '',
      phone_number: business?.phone_number ?? '',
    });
  }, [
    business?.address,
    business?.business_email,
    business?.channel,
    business?.country,
    business?.facebook,
    business?.industry,
    business?.instagram,
    business?.logo,
    business?.name,
    business?.online_channel,
    business?.phone_number,
    business?.rc_number,
    business?.state,
    business?.website_link,
    form,
  ]);

  useFetchBusiness();

  const platformsValue = form.watch('online_platforms');

  return (
    <Sheet modal={false} open={open} onOpenChange={setOpen}>
      <SheetTrigger className="flex flex-row items-center gap-1">
        <Edit3Icon className="w-4 h-4 mr-1.5 text-pashBlack-1" />
        <span className="text-sm font-medium text-pashBlack-1">Edit</span>
      </SheetTrigger>
      <div
        className={cn(
          'w-screen h-screen fixed top-0 left-0 z-50',
          open ? 'inset-0 bg-black/80' : 'bg-transparent pointer-events-none',
        )}
      >
        <SheetContent className="h-[calc(100%-48px)] my-auto w-full max-w-[600px] px-6 py-0 border-0 shadow-none bg-transparent">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full h-full bg-white rounded-lg"
            >
              <SheetHeader className="flex-row items-center px-5 h-[64px] border-b border-mountainAsh-6 justify-between space-y-0">
                <SheetTitle>Business Information</SheetTitle>
                <SheetDescription className="hidden"></SheetDescription>
              </SheetHeader>

              <ScrollArea className="h-[calc(100%-64px-72px)]">
                <div className="p-5 flex flex-col gap-5">
                  <FormField
                    control={form.control}
                    name="cac_rc_number"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>CAC/RC Number</FormLabel>
                        <FormControl>
                          <Input {...field} className="h-12" disabled />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="business_name"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Business Name</FormLabel>
                        <FormControl>
                          <Input {...field} className="h-12" disabled />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="business_email"
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
                          <Input {...field} className="h-12" disabled />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Business Industry</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger
                              className={cn(
                                'h-12',
                                !field.value && 'text-pashBlack-6',
                              )}
                            >
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {INDUSTRIES.map((industry, index) => (
                              <SelectItem key={index} value={industry.value}>
                                {industry.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="channel"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Business Channel</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger
                              className={cn(
                                'h-12',
                                !field.value && 'text-pashBlack-6',
                              )}
                            >
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {BUSINESS_CHANNELS.map((channel, index) => (
                              <SelectItem key={index} value={channel.value}>
                                {channel.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="online_platforms"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>What online platform do you use?</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                type="button"
                                variant="outline"
                                size={'lg'}
                                role="combobox"
                                className={cn(
                                  'flex w-full justify-between hover:bg-white px-3 font-normal',
                                  !field.value.length &&
                                    'text-muted-foreground',
                                )}
                              >
                                {field.value.length > 0 ? (
                                  <div className="flex items-center gap-1 flex-1 overflow-auto">
                                    {field.value.map((platform, index) => (
                                      <span
                                        key={index}
                                        className="py-1.5 px-2 rounded-lg bg-mountainAsh-7 text-pashBlack-4 flex items-center gap-1"
                                      >
                                        {platform}
                                        <button
                                          type="button"
                                          onClick={e =>
                                            handleDeletePlatform(platform, e)
                                          }
                                          className="w-4 h-4 flex items-center justify-center rounded-full bg-pashBlack-1 hover:bg-pashBlack-2 transition-colors"
                                        >
                                          <X className="text-white w-2.5 h-2.5" />
                                        </button>
                                      </span>
                                    ))}
                                  </div>
                                ) : (
                                  <span />
                                )}
                                <ChevronDown className="h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            align="start"
                            className="w-[--radix-popover-trigger-width] p-0"
                          >
                            <Command>
                              <CommandInput placeholder="Search platform..." />
                              <CommandList>
                                <CommandEmpty>No platform found.</CommandEmpty>
                                <CommandGroup>
                                  {platforms.map(platform => (
                                    <CommandItem
                                      key={platform.value}
                                      onSelect={() => {
                                        const isSelected = field.value.includes(
                                          platform.value,
                                        );
                                        const newValue = isSelected
                                          ? field.value.filter(
                                              value => value !== platform.value,
                                            )
                                          : [...field.value, platform.value];
                                        form.setValue(
                                          'online_platforms',
                                          newValue,
                                        );
                                      }}
                                    >
                                      <Checkbox
                                        checked={field.value.includes(
                                          platform.value,
                                        )}
                                        className="mr-2"
                                      />
                                      {platform.label}
                                    </CommandItem>
                                  ))}
                                  <CommandItem
                                    onSelect={() => {
                                      const newValue =
                                        field.value.length ===
                                        ALL_PLATFORMS.length
                                          ? []
                                          : [...ALL_PLATFORMS];
                                      form.setValue(
                                        'online_platforms',
                                        newValue,
                                      );
                                    }}
                                  >
                                    <Checkbox
                                      checked={
                                        field.value.length ===
                                        ALL_PLATFORMS.length
                                      }
                                      className="mr-2"
                                    />
                                    All the above
                                  </CommandItem>
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {platformsValue.includes('website') && (
                    <FormField
                      control={form.control}
                      name="website"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>Website Link</FormLabel>
                          <FormControl>
                            <div className="relative flex items-center">
                              <p className="absolute left-2.5 text-sm text-pashBlack-5">
                                https://
                              </p>
                              <Input {...field} className="pl-14 h-12" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  {platformsValue.includes('instagram') && (
                    <FormField
                      control={form.control}
                      name="instagram"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>Instagram Handle</FormLabel>
                          <FormControl>
                            <div className="relative flex items-center">
                              <p className="absolute left-2.5 text-sm text-pashBlack-5">
                                @
                              </p>
                              <Input {...field} className="pl-8 h-12" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  {platformsValue.includes('facebook') && (
                    <FormField
                      control={form.control}
                      name="facebook"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>Facebook</FormLabel>
                          <FormControl>
                            <Input {...field} className="h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <FormField
                    control={form.control}
                    name="address"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Business Address</FormLabel>
                        <FormControl>
                          <Input {...field} className="h-12" />
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
                          <Input {...field} className="h-12" />
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
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-[155.41px]"
                >
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
      </div>
    </Sheet>
  );
};

const EditDirectorInfo = () => {
  const {business, directorsDetails, setDirectorDetails} = useBusiness();
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
      phone_number: `+${
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
        getDirectorDetails(business.id);
        setOpen(false);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  const getDirectorDetails = async (business_id: string) => {
    try {
      const res: ApiResponseT = await businessServices.getDirectorDetails(
        business_id,
      );
      if (res.status === 'success') {
        setDirectorDetails(res.data);
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ?? 'Error fetching director details',
      );
    }
  };

  useEffect(() => {
    form.reset({
      first_name: directorsDetails[0]?.first_name ?? '',
      last_name: directorsDetails[0]?.last_name ?? '',
      email: directorsDetails[0]?.email ?? '',
      phone_number:
        directorsDetails[0]?.phone_number.replace(/^\+234/, '0') ?? '',
      address: directorsDetails[0]?.address ?? '',
    });
  }, [directorsDetails, form]);

  useFetchDirectorsDetails();

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
              <SheetTitle>Director's Information</SheetTitle>
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

const ChangePassword = () => {
  const formSchema = z.object({
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters long',
    }),
    new_password: z.string().min(6, {
      message: 'Password must be at least 6 characters long',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      new_password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant={'secondary'}
          size={'lg'}
          className="border border-mountainAsh-5 mt-2"
        >
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-lg">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <Input {...field} className="h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="new_password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input {...field} className="h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size={'lg'}>
              Continue
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
