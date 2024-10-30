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
import {SectionValueT} from './unregistered-business';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '@/router/routes';

type Props = {
  setCurrentSection: React.Dispatch<React.SetStateAction<SectionValueT>>;
  business_type: 'registered' | 'unregistered';
};

const formSchema = z.object({
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  linkedIn: z.string().optional(),
});

export const BusinessSocials = ({setCurrentSection, business_type}: Props) => {
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({values});
    if (business_type === 'registered') {
      setCurrentSection('directors_details');
    } else {
      navigate(ROUTES.registrationSuccess);
    }
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
            disabled={!isBtnActive}
          >
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};
