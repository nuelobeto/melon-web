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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {cn} from '@/lib/utils';
import {BUSINESS_CHANNELS, INDUSTRIES} from '@/constants';
import {
  CountryCodeType,
  RegistrationStageT,
  UpdateBusinessDetailsT,
} from '@/types';
import {CountryCode} from '@/components/ui/country-code';
import {useAuth} from '@/store/useAuth';
import {useFetchBusiness} from '@/hooks/useQueries';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import businessServices from '@/services/business';
import {toast} from 'react-toastify';
import {Loader2} from 'lucide-react';
import {uploadToCloudinary} from '@/helpers';

type Props = {
  setCurrentSection: React.Dispatch<React.SetStateAction<RegistrationStageT>>;
  setCompleted: React.Dispatch<React.SetStateAction<RegistrationStageT[]>>;
  completed: RegistrationStageT[];
  business_type: 'registered' | 'unregistered';
};

export const BusinessDetails = ({
  setCurrentSection,
  setCompleted,
  completed,
  business_type,
}: Props) => {
  const queryClient = useQueryClient();

  const {user} = useAuth();
  const {data: business} = useFetchBusiness({
    businessId: user?.business_id as string,
  });

  const [file, setFile] = useState<File | undefined>(undefined);
  const [logo, setLogo] = useState<string | null>(null);
  const [selectedCountryCode, setSelectedCountryCode] =
    useState<CountryCodeType | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setFile(file);
      const imageURL = URL.createObjectURL(file);
      setLogo(imageURL);
    }
  };

  const formSchema = z.object({
    rc_number:
      business_type === 'registered'
        ? z.string().min(1, {
            message: 'Enter RC number',
          })
        : z.string().optional(),
    name: z.string().min(1, {
      message: 'Enter business name',
    }),
    email: emailSchema('Enter business email'),
    phone_number: phoneNumberSchema('Enter business phone number'),
    industry: z.string().min(1, {
      message: 'Select business industry',
    }),
    channel: z.string().min(1, {
      message: 'Please enter your business channel',
    }),
    website_link: z.string().optional(),
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rc_number: '',
      name: '',
      email: '',
      phone_number: '',
      industry: '',
      channel: '',
      website_link: '',
      country: '',
      state: '',
      city: '',
      street: '',
    },
  });

  const isBtnActive =
    (!!form.watch('name') &&
      !!form.watch('email') &&
      !!form.watch('phone_number') &&
      !!form.watch('industry') &&
      !!form.watch('channel') &&
      !!form.watch('country') &&
      !!form.watch('state') &&
      !!form.watch('city') &&
      !!form.watch('street') &&
      business_type === 'unregistered') ||
    !!form.watch('rc_number');

  const {mutate, status} = useMutation({
    mutationFn: businessServices.updateBusinessDetails,
    onSuccess: () => {
      setCurrentSection('business_socials');
      queryClient.invalidateQueries({
        queryKey: ['business'],
      });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || 'Error updating business details',
      );
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const newLogo: string | null = file
        ? (await uploadToCloudinary(file)).url
        : logo;

      // Build commonDetails object and conditionally include website_link
      const commonDetails = {
        logo: newLogo,
        name: values.name,
        phone_number: `+${
          selectedCountryCode?.callingCode
        }${values.phone_number.slice(1)}`,
        industry: values.industry,
        channel: values.channel,
        country: values.country,
        state: values.state,
        city: values.city,
        street: values.street,
        type: business_type,
        ...(values.website_link && {website_link: values.website_link}), // Only add if not an empty string
      };

      // Add RC number only if business type is 'registered'
      const details =
        business_type === 'registered'
          ? {...commonDetails, rc_number: values.rc_number}
          : commonDetails;

      const payload: UpdateBusinessDetailsT = {
        details,
        business_id: business?.data?.id,
      };

      mutate(payload);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Optionally, handle or display the error here
    }
  }

  useEffect(() => {
    return () => {
      if (logo) {
        URL.revokeObjectURL(logo);
      }
    };
  }, [logo]);

  useEffect(() => {
    if (business && business.data && business.data.details) {
      setLogo(business.data.details.logo);
      form.reset({
        rc_number: business.data.details.rc_number ?? '',
        name: business.data.details.name ?? '',
        email: business.data.details.business_email ?? '',
        phone_number: business.data.details.phone_number
          ? business.data.details.phone_number.replace(/^(\+234)/, '0')
          : '',
        industry: business.data.details.industry ?? '',
        channel: business.data.details.channel ?? '',
        website_link: business.data.details.website_link ?? '',
        country: business.data.details.country ?? '',
        state: business.data.details.state ?? '',
        city: business.data.details.city ?? '',
        street: business.data.details.street ?? '',
      });
    }
  }, [business, form]);

  useEffect(() => {
    if (business && business.data && business.data.details) {
      if (
        !!business.data.details.rc_number &&
        !!business.data.details.name &&
        !!business.data.details.business_email &&
        !!business.data.details.phone_number &&
        !!business.data.details.industry &&
        !!business.data.details.channel &&
        !!business.data.details.website_link &&
        !!business.data.details.country &&
        !!business.data.details.state &&
        !!business.data.details.city &&
        !!business.data.details.street
      ) {
        setCompleted([...completed, 'business_details']);
      }
    }
  }, [business, completed, setCompleted]);

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
                Business details
              </h1>
              <p className="text-sm text-pashBlack-7">
                Give us more details about your business
              </p>
            </div>

            <div className="mt-6 space-y-6">
              <div className="w-full p-5 border border-dashed border-mountainAsh-1 bg-mountainAsh-10 rounded-md flex flex-col items-center">
                {logo ? (
                  <div className="w-[100px] h-[100px] rounded-full p-2.5 border border-mountainAsh-1 bg-mountainAsh-8">
                    <img src={logo} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-mountainAsh-7 flex items-center justify-center">
                    <img
                      src="/images/cloud-plus.svg"
                      alt=""
                      width={24}
                      height={24}
                    />
                  </div>
                )}

                {logo ? (
                  <div className="w-full flex items-center justify-center gap-3 mt-3">
                    <div className="">
                      <label
                        htmlFor="file"
                        className="block text-sm text-pink-1 font-semibold text-center cursor-pointer h-10 px-4 py-2 rounded-lg border border-mountainAsh-1 bg-gradient-to-b from-[#F5F6F8] to-[#d2d9e99e]"
                      >
                        Change logo
                      </label>
                      <input
                        type="file"
                        id="file"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                    <button
                      className="text-sm text-pashBlack-1 font-semibold text-center cursor-pointer h-10 px-4 py-2 rounded-lg border border-mountainAsh-1 bg-gradient-to-b from-[#F5F6F8] to-[#d2d9e99e]"
                      onClick={() => {
                        setLogo(null);
                      }}
                    >
                      Remove logo
                    </button>
                  </div>
                ) : (
                  <div className="w-full mt-1.5 flex flex-col items-center">
                    <p className="text-center text-xs text-[#334155]">
                      Upload Business Logo
                    </p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <label
                        htmlFor="file"
                        className="text-sm text-pink-1 font-semibold text-center cursor-pointer"
                      >
                        Click to upload
                      </label>
                      <p className="text-sm text-pashBlack-4 text-center font-normal">
                        or drag and drop
                      </p>
                    </div>
                    <input
                      type="file"
                      id="file"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <p className="text-xs text-pashBlack-7 mt-[2px]">
                      SVG, PNG, JPG (max. 800x400px)
                    </p>
                  </div>
                )}
              </div>

              {business_type === 'registered' && (
                <FormField
                  control={form.control}
                  name="rc_number"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>RC Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter RC number"
                          {...field}
                          className="h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter business name"
                        {...field}
                        className="h-12"
                        disabled
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
                        placeholder="Enter business email"
                        {...field}
                        className="h-12"
                        disabled
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
                          placeholder="Enter business phone number"
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
                          <SelectValue placeholder="Select industry" />
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
                          <SelectValue placeholder="Select business channel" />
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
                name="website_link"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>
                      Website Link{' '}
                      <span className="text-pashBlack-6">(optional)</span>
                    </FormLabel>
                    <Input
                      {...field}
                      placeholder="Enter website link"
                      className="h-12"
                    />
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
