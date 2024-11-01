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
import {ScrollArea} from '@/components/ui/scroll-area';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '@/router/routes';
import {RegistrationStageT, UpdateSocialsT} from '@/types';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {toast} from 'react-toastify';
import businessServices from '@/services/business';
import {useEffect} from 'react';
import {useAuth} from '@/store/useAuth';
import {useFetchBusiness} from '@/hooks/useQueries';
import {Loader2} from 'lucide-react';

type Props = {
  setCurrentSection: React.Dispatch<React.SetStateAction<RegistrationStageT>>;
  setCompleted: React.Dispatch<React.SetStateAction<RegistrationStageT[]>>;
  completed: RegistrationStageT[];
  business_type: 'registered' | 'unregistered';
};

const formSchema = z.object({
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  linkedIn: z.string().optional(),
});

export const BusinessSocials = ({
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

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      instagram: '',
      facebook: '',
      twitter: '',
      linkedIn: '',
    },
  });

  const isBtnActive =
    !!form.watch('instagram') ||
    !!form.watch('facebook') ||
    !!form.watch('twitter') ||
    !!form.watch('linkedIn');

  const {mutate, status} = useMutation({
    mutationFn: businessServices.updateSocials,
    onSuccess: () => {
      if (business_type === 'registered') {
        setCurrentSection('directors_details');
      } else {
        navigate(ROUTES.registrationSuccess);
      }
      queryClient.invalidateQueries({
        queryKey: ['business'],
      });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || 'Error updating business socials',
      );
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload: UpdateSocialsT = {
      ...(values.instagram && {instagram: values.instagram}),
      ...(values.facebook && {facebook: values.facebook}),
      ...(values.twitter && {twitter: values.twitter}),
      ...(values.linkedIn && {linkedIn: values.linkedIn}),
    };

    mutate(payload);
  }

  useEffect(() => {
    if (business && business.data && business.data.socials) {
      form.reset({
        instagram: business.data.socials.instagram ?? '',
        facebook: business.data.socials.facebook ?? '',
        twitter: business.data.socials.twitter ?? '',
        linkedIn: business.data.socials.linkedIn ?? '',
      });
    }
  }, [business, form]);

  useEffect(() => {
    if (business && business.data && business.data.socials) {
      if (
        !!business.data.socials.instagram ||
        !!business.data.socials.facebook ||
        !!business.data.socials.twitter ||
        !!business.data.socials.industry
      ) {
        setCompleted([...completed, 'business_socials']);
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
              <h1 className="text-3xl font-medium text-pashBlack-1">Socials</h1>
              <p className="text-sm text-pashBlack-7">
                Enter your business social links
              </p>
            </div>

            <div className="mt-6 space-y-6">
              <FormField
                control={form.control}
                name="instagram"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Instagram Handle</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter instagram handle"
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
                name="facebook"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Facebook</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter facebook name"
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
                name="twitter"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Twitter</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter twitter handle"
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
                name="linkedIn"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>LinkedIn</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter LinkedIn"
                        {...field}
                        className="h-12"
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
