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
import {useEffect, useState} from 'react';
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
import {ChevronDown, Loader2, X} from 'lucide-react';
import {Checkbox} from '@/components/ui/checkbox';
import {AiOutlineCloudUpload} from 'react-icons/ai';
import {FileUpload} from '@/components/ui/file-upload';
import {FileType} from '@/types';
import {Card} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export const BusinessSettings = () => {
  const [logo, setLogo] = useState<FileType | null>(null);
  const [logoLoading, setLogoLoading] = useState(false);

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
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      business_logo: '',
      cac_rc_number: '',
      business_name: '',
      business_email: '',
      phone_number: '',
      industry: '',
      channel: '',
      online_platforms: [],
      website: '',
      instagram: '',
      facebook: '',
      address: '',
      state: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

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

  useEffect(() => {
    form.reset({
      business_name: 'Jumia',
      business_email: 'jumia@gmail.com',
      phone_number: '+2348012345678',
    });
  }, [form]);

  return (
    <>
      <h2 className="font-semibold text-2xl text-pashBlack-1 mb-7">
        Business Profile
      </h2>
      <Card className="p-0 pb-12 border-0 shadow-none min-[900px]:p-6 min-[900px]:border min-[900px]:shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-8">
              <div className="w-full max-w-[335px] p-5 rounded-lg border border-dashed border-mountainAsh-1 bg-mountainAsh-10">
                <div className="flex flex-col items-center">
                  {logo ? (
                    <>
                      <div className="flex w-[80px] h-[80px] items-center justify-center p-4 border border-mountainAsh-1 rounded-full bg-mountainAsh-7">
                        <img
                          src={logo.url}
                          alt=""
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <Button
                        type="button"
                        className="w-[200px] border-0 h-8 bg-pashBlack-1 text-white text-xs mt-3 hover:bg-pashBlack-3"
                        onClick={() => setLogo(null)}
                      >
                        Remove
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-mountainAsh-7">
                        {logoLoading ? (
                          <Loader2 className="w-6 h-6 text-pashBlack-3 animate-spin" />
                        ) : (
                          <AiOutlineCloudUpload className="w-6 h-6 text-pashBlack-3" />
                        )}
                      </div>
                      <p className="text-xs text-pashBlack-4 mt-1">
                        Upload Business Logo
                      </p>
                      <div className="text-center text-sm flex items-center gap-1 mt-1.5">
                        <FileUpload
                          setFile={setLogo}
                          setLoading={setLogoLoading}
                        >
                          <span className="text-pink-1">
                            Click to upload logo
                          </span>
                        </FileUpload>
                        <span className="text-pashBlack-4">
                          or drag and drop
                        </span>
                      </div>
                      <p className="text-pashBlack-7 text-xs text-center mt-1">
                        SVG, PNG, JPG (max. 800x400px)
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="cac_rc_number"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>CAC/RC Number</FormLabel>
                      <FormControl>
                        <Input {...field} className="h-12" />
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
                          <SelectItem value="m@example.com">
                            m@example.com
                          </SelectItem>
                          <SelectItem value="m@google.com">
                            m@google.com
                          </SelectItem>
                          <SelectItem value="m@support.com">
                            m@support.com
                          </SelectItem>
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
                          <SelectItem value="m@example.com">
                            m@example.com
                          </SelectItem>
                          <SelectItem value="m@google.com">
                            m@google.com
                          </SelectItem>
                          <SelectItem value="m@support.com">
                            m@support.com
                          </SelectItem>
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
                              variant="outline"
                              size={'lg'}
                              role="combobox"
                              className={cn(
                                'flex w-full justify-between hover:bg-white px-3 font-normal',
                                !field.value.length && 'text-muted-foreground',
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
                                    form.setValue('online_platforms', newValue);
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
                <FormField
                  control={form.control}
                  name="website"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Website Link</FormLabel>
                      <FormControl>
                        <Input {...field} className="h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="instagram"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Instagram Handle</FormLabel>
                      <FormControl>
                        <Input {...field} className="h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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

                <ChangePassword />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button type="submit" size={'lg'}>
                  Continue
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </>
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
