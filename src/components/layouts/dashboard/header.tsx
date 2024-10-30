import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {ChevronDown} from 'lucide-react';
import {HiOutlineMenuAlt2} from 'react-icons/hi';
import {MobileSidebar} from './mobile-sidebar';
import {useFetchPersonalDetails} from '@/hooks/business';
import {useBusiness} from '@/store/useBusiness';

type Props = {
  pageTitle: React.ReactNode;
};

export const Header = ({pageTitle}: Props) => {
  const {personalDetails} = useBusiness();
  useFetchPersonalDetails();

  const hasName = !!personalDetails?.first_name || !!personalDetails?.last_name;

  return (
    <header className="flex items-center justify-between px-7 h-16 border-b border-mountainAsh-6">
      <div className="flex items-center gap-4">
        <div className="min-[900px]:hidden">
          <MobileSidebar>
            <button className="flex items-center">
              <HiOutlineMenuAlt2 className="text-2xl" />
            </button>
          </MobileSidebar>
        </div>
        <div className="text-xl text-pashBlack-1 font-semibold flex items-center gap-2">
          {pageTitle}
        </div>
      </div>

      <div className="flex gap-2">
        <button className="w-11 h-11 rounded-full bg-mountainAsh-8 flex items-center justify-center">
          <img src="/images/notification.svg" alt="" width={24} height={24} />
        </button>

        {personalDetails && hasName && (
          <Popover>
            <PopoverTrigger className="h-11 rounded-full bg-[#0A1C2C] py-1.5 pl-1.5 pr-2 flex items-center gap-1">
              <Avatar className="w-[35px] h-[35px]">
                <AvatarImage src={undefined} />
                <AvatarFallback className="bg-[#142A3E] text-white text-sm font-medium">
                  {personalDetails.first_name.charAt(0)}{' '}
                  {personalDetails.last_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <p className="text-white font-medium text-sm hidden">John Doe</p>
              <ChevronDown className="text-white" />
            </PopoverTrigger>
            <PopoverContent>Place content for the popover here.</PopoverContent>
          </Popover>
        )}
      </div>
    </header>
  );
};
