import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {cn} from '@/lib/utils';
import {ROUTES} from '@/router/routes';
import {Check, X} from 'lucide-react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

type BusinessType = 'registered' | 'unregistered';

export const SelectBusinessType = ({children}: Props) => {
  const [selected, setSelected] = useState<BusinessType>('registered');
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (selected === 'registered') {
      navigate(ROUTES.registeredBusinessRegistration);
    } else {
      navigate(ROUTES.unRegisteredBusinessRegistration);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-6 max-w-[460px] gap-0">
        <DialogHeader className="flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-2xl text-pashBlack-1">
            Select Business Type
          </DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
          <DialogClose className="w-9 h-9 rounded-full bg-[#F1F5F9] flex items-center justify-center">
            <X className="w-5 h-5" />
          </DialogClose>
        </DialogHeader>

        <div className="flex flex-col gap-[18px] mt-[18px]">
          <button
            className={cn(
              'rounded-lg py-5 px-4 border relative',
              selected === 'registered'
                ? 'bg-[#EEFFF4] border-[#34C759]'
                : 'bg-mountainAsh-9 border-transparent',
            )}
            onClick={() => setSelected('registered')}
          >
            {selected === 'registered' && (
              <span className="absolute w-5 h-5 rounded-full flex items-center justify-center bg-[#34C759] right-4">
                <Check className="w-3 h-3 text-white stroke-[3px]" />
              </span>
            )}
            <h2 className="text-2xl font-medium text-pashBlack-1 text-left">
              Registered Business
            </h2>
            <p className="mt-2 text-pashBlack-4 text-left">
              For Businesses registered under the corporate Affairs commission
              of Nigeria. You will need to provide an RC Number and director's
              details
            </p>
          </button>

          <button
            className={cn(
              'rounded-lg py-5 px-4 border relative',
              selected === 'unregistered'
                ? 'bg-[#EEFFF4] border-[#34C759]'
                : 'bg-mountainAsh-9 border-transparent',
            )}
            onClick={() => setSelected('unregistered')}
          >
            {selected === 'unregistered' && (
              <span className="absolute w-5 h-5 rounded-full flex items-center justify-center bg-[#34C759] right-4">
                <Check className="w-3 h-3 text-white stroke-[3px]" />
              </span>
            )}
            <h2 className="text-2xl font-medium text-pashBlack-1 text-left">
              UnRegistered Business
            </h2>
            <p className="mt-2 text-pashBlack-4 text-left">
              For businesses not registered under the Corporate Affairs
              Commission of Nigeria, You will need to provide a valid personal
              ID
            </p>
          </button>

          <Button size={'lg'} onClick={handleNavigate}>
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
