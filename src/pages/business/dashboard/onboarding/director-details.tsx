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
import {CountryCodeType} from '@/types';
import {CountryCode} from '@/components/ui/country-code';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '@/router/routes';

const formSchema = z.object({
  full_name: z.string().min(1, {
    message: 'Enter business name',
  }),
  email: emailSchema('Enter business email'),
  phone_number: phoneNumberSchema('Enter business phone number'),
  address: z.string().min(1, {
    message: 'Enter country',
  }),
});

export const DirectorDetails = () => {
  const [selectedCountryCode, setSelectedCountryCode] =
    useState<CountryCodeType | null>(null);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: '',
      email: '',
      phone_number: '',
      address: '',
    },
  });

  const isBtnActive =
    !!form.watch('full_name') &&
    !!form.watch('email') &&
    !!form.watch('phone_number') &&
    !!form.watch('address');

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({values});
    navigate(ROUTES.verifyDirectorPhone);
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
                Directors Details
              </h1>
              <p className="text-sm text-pashBlack-7">
                Give us more details about your Business Director
              </p>
            </div>

            <div className="mt-6 space-y-6">
              <FormField
                control={form.control}
                name="full_name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter director's full name"
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
            disabled={!isBtnActive}
          >
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};
