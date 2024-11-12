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
import {UpdateSocialsT} from '@/types';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useFetchBusiness} from '@/hooks/useQueries';
import {useAuth} from '@/store/useAuth';
import businessServices from '@/services/business';
import {toast} from 'react-toastify';
import {Loader2} from 'lucide-react';
import {useEffect, useState} from 'react';

const formSchema = z.object({
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  linkedIn: z.string().optional(),
});

export const EditSocials = () => {
  const queryClient = useQueryClient();

  const {user} = useAuth();
  const {data: business} = useFetchBusiness({
    businessId: user?.business_id as string,
  });

  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      instagram: '',
      facebook: '',
      twitter: '',
      linkedIn: '',
    },
  });

  const {mutate, status} = useMutation({
    mutationFn: businessServices.updateSocials,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['business'],
      });
      setOpen(false);
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
