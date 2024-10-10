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
import {Loader2} from 'lucide-react';
import {useEffect, useState} from 'react';
import {CountryCodeType, CreateAccountT} from '@/types';
import {toast} from 'react-toastify';
import authServices from '@/services/auth';
import {useNavigate, useParams} from 'react-router-dom';
import {ROUTES} from '@/router/routes';
import {CountryCode} from '@/components/ui/country-code';

export const EnterPhone = () => {
  const [referrer, setReferrer] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] =
    useState<CountryCodeType | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsSuccess, setDetailsSuccess] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const refCode = params.refCode;

  const getReferalDetails = async (refCode: string) => {
    setDetailsLoading(true);
    try {
      const res = await authServices.getReferralDetails(refCode);
      if (res.status === 'success') {
        setReferrer(res.data.first_name);
        setDetailsLoading(false);
        setDetailsSuccess(true);
      }
    } catch (error: any) {
      console.log(error);
      setDetailsLoading(false);
      setDetailsError(true);
    }
  };

  const formSchema = z.object({
    phone: z.string().min(11, {
      message: 'Phone is required',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (refCode) {
      const payload: CreateAccountT = {
        phone_number: values.phone.slice(1),
        country_code: `+${selectedCountryCode!.callingCode}`,
        referral_code: refCode,
        referred: true,
      };

      createAccount(payload);
    }
  }

  const createAccount = async (payload: CreateAccountT) => {
    setLoading(true);
    try {
      const res = await authServices.createAccount(payload);
      if (res.status === 'success') {
        setLoading(false);
        navigate(
          ROUTES.verifyPhoneMobile.replace(':phone', payload.phone_number),
        );
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (refCode) {
      getReferalDetails(refCode);
    }
  }, [refCode]);

  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center px-5 py-16">
      {detailsLoading && (
        <div className="flex flex-col items-center">
          <Loader2 className="animate-spin w-10 h-10 text-darkLime-4" />
        </div>
      )}

      {detailsSuccess && !detailsLoading && (
        <div className="flex flex-col w-full max-w-[350px]">
          <h1 className="font-medium text-2xl text-pashBlack-1 mb-2 text-center">
            Yay! {referrer} has referred you to start earning points on Melon
          </h1>
          <p className="text-pashBlack-5 mb-8 text-center">
            Enter your phone number below to earn 500 points!
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="phone"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <CountryCode
                          selectedCountryCode={selectedCountryCode}
                          setSelectedCountryCode={setSelectedCountryCode}
                        />
                        <Input
                          type="tel"
                          placeholder="Enter your phone number"
                          className="pl-16"
                          {...field}
                          maxLength={11}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : 'Continue'}
              </Button>
            </form>
          </Form>
        </div>
      )}

      {!loading && detailsError && (
        <div className="flex flex-col items-center">
          <img
            src="/images/404.jpg"
            alt=""
            width={200}
            height={200}
            className="mb-6"
          />
          <div className="w-full max-w-[350px]">
            <h1 className="font-medium text-2xl text-pashBlack-1 text-center mb-2">
              An error occured
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};
