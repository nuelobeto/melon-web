import {Card} from '@/components/ui/card';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {Edit3Icon, Trash2} from 'lucide-react';
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

export const ProfileSettings = () => {
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
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <h2 className="font-semibold text-2xl text-pashBlack-1 mb-7">
        My Profile
      </h2>
      <div className="flex flex-col gap-6 pb-12 min-[900px]:flex-row">
        <Card className="w-full min-[900px]:max-w-[300px] flex flex-col items-center p-6 gap-3 h-fit">
          <div className="w-[150px] h-[150px] rounded-full border border-mountainAsh-1 border-dashed p-1">
            <Avatar className="w-full h-full">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="text-4xl">CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex items-center gap-3">
            <Button variant={'secondary'}>
              <Trash2 className="w-5 h-5 mr-1.5" /> Remove
            </Button>
            <Button className="bg-pashBlack-1 hover:bg-pashBlack-1 text-white border-pashBlack-1">
              <Edit3Icon className="w-5 h-5 mr-1.5" />
              Edit
            </Button>
          </div>
        </Card>

        <Card className="grow p-0 border-0 shadow-none min-[900px]:p-6 min-[900px]:border min-[900px]:shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <div className="flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          <Input {...field} className="h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
      </div>
    </>
  );
};
