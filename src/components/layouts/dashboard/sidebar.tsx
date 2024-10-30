import {ChevronDown, LogOut} from 'lucide-react';
import {NavLink} from 'react-router-dom';
import {useBusiness} from '@/store/useBusiness';
import {useAuth} from '@/store/useAuth';
import {useFetchPersonalDetails} from '@/hooks/business';
import {Avatar, AvatarFallback, AvatarImage} from '../../ui/avatar';
import {navlinks} from '@/constants/navlinks';
import {cn} from '@/lib/utils';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';

export const SideBar = () => {
  const {logout} = useAuth();
  const {business, personalDetails} = useBusiness();

  function truncateString(input: string, maxLength: number = 20): string {
    return input.length > maxLength ? `${input.slice(0, maxLength)}...` : input;
  }

  useFetchPersonalDetails();

  return (
    <aside className="min-w-64 h-full bg-[#081623] hidden min-[900px]:block">
      <div className="px-5">
        <Popover>
          <PopoverTrigger asChild>
            <button className="w-full h-16 flex items-center justify-between">
              <div className="flex items-center gap-2 overflow-hidden">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={business?.logo ?? undefined} />
                  <AvatarFallback className="text-pashBlack-1">
                    {business?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col max-w-[140px]">
                  <h2 className="font-medium text-sm text-white whitespace-nowrap">
                    {truncateString(business?.name ?? '')}
                  </h2>
                  <p className="text-xs text-mountainAsh-1 whitespace-nowrap">
                    {truncateString(
                      `${personalDetails?.first_name ?? ''} ${
                        personalDetails?.last_name ?? ''
                      }`,
                    )}
                  </p>
                </div>
              </div>
              <span>
                <ChevronDown className="text-white" />
              </span>
            </button>
          </PopoverTrigger>

          <PopoverContent className="w-[--radix-popover-trigger-width] bg-[#0c2338] border-[#142b41] p-2 shadow-xl shadow-black/30">
            <button
              className="flex items-center gap-2 text-white text-sm w-full"
              onClick={logout}
            >
              <LogOut className="text-white w-5 h-5" /> Logout
            </button>
          </PopoverContent>
        </Popover>
      </div>

      <div className="w-full h-[calc(100%-64px-64px)] flex flex-col gap-1 px-5 py-10">
        {navlinks.map((link, index) => (
          <div key={index}>
            {!link.comingSoon && (
              <NavLink
                key={index}
                to={link.url}
                className={({isActive}) =>
                  cn(
                    'px-4 h-10 rounded-xl flex items-center gap-2.5 hover:bg-[#0F2132]',
                    isActive && 'bg-[#0F2132]',
                  )
                }
              >
                {({isActive}) => (
                  <>
                    {link.icon}
                    <span
                      className={cn(
                        'text-sm',
                        isActive ? 'text-white' : 'text-pashBlack-8',
                      )}
                    >
                      {link.label}
                    </span>
                    {link.comingSoon && (
                      <span className="text-[8px] text-pink-1 p-1 rounded-[4px] bg-pink-2/30">
                        Coming soon
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            )}

            {link.comingSoon && (
              <NavLink
                key={index}
                to={link.url}
                className="px-4 h-10 rounded-xl flex items-center gap-2.5 pointer-events-none"
              >
                {link.icon}
                <span className="text-sm text-pashBlack-5">{link.label}</span>
                <span className="text-[8px] text-pink-1 p-1 rounded-[4px] bg-pink-2/30">
                  Coming soon
                </span>
              </NavLink>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};
