import {emailSchema, phoneNumberSchema} from '@/helpers/zod-schema';
import {zodResolver} from '@hookform/resolvers/zod';
import {useState} from 'react';
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
import {CountryCodeType} from '@/types';
import {CountryCode} from '@/components/ui/country-code';
import {SectionValueT} from './unregistered-business';

type Props = {
  setCurrentSection: React.Dispatch<React.SetStateAction<SectionValueT>>;
};

const formSchema = z.object({
  rc_number: z.string().min(1, {
    message: 'Enter RC number',
  }),
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

export const BusinessDetails = ({setCurrentSection}: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedCountryCode, setSelectedCountryCode] =
    useState<CountryCodeType | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rc_number: '',
      name: '',
      email: '',
      phone_number: '',
      industry: '',
      channel: '',
      country: '',
      state: '',
      city: '',
      street: '',
    },
  });

  const isBtnActive =
    !!form.watch('rc_number') &&
    !!form.watch('name') &&
    !!form.watch('email') &&
    !!form.watch('phone_number') &&
    !!form.watch('industry');
  !!form.watch('channel') &&
    !!form.watch('country') &&
    !!form.watch('state') &&
    !!form.watch('city') &&
    !!form.watch('street');

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({values}, {image});
    setCurrentSection('business_socials');
  }

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
                {imagePreview ? (
                  <div className="w-[100px] h-[100px] rounded-full p-4 border border-mountainAsh-1 bg-mountainAsh-8">
                    <img
                      src={imagePreview}
                      className="w-full h-full object-cover"
                    />
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

                {imagePreview ? (
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
                        setImage(null);
                        setImagePreview(null);
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
            disabled={!isBtnActive}
          >
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};
