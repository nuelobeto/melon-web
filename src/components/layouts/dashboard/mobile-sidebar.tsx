import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {navlinks} from '@/constants/navlinks';
import {useFetchBusiness} from '@/hooks/useQueries';
import {cn} from '@/lib/utils';
import {useAuth} from '@/store/useAuth';
import {X, LogOut} from 'lucide-react';
import React from 'react';
import {NavLink} from 'react-router-dom';

export const MobileSidebar = ({children}: {children: React.ReactNode}) => {
  const {user, logout} = useAuth();
  const {data: business} = useFetchBusiness({
    businessId: user?.business_id as string,
  });

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side={'left'}
        className="w-full max-w-[350px] bg-[#081623] border-none p-0"
      >
        <SheetHeader className="w-full h-16 flex flex-row items-center justify-between px-5 space-y-0 ">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={business?.data?.details?.logo ?? undefined} />
              <AvatarFallback className="text-pashBlack-1">
                {business?.data?.details?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <SheetTitle className="font-medium text-base text-white">
                {business?.data?.details?.name}
              </SheetTitle>
              <SheetDescription className="text-xs text-mountainAsh-1 text-left hidden">
                {/* {personalDetails?.first_name} {personalDetails?.last_name} */}
              </SheetDescription>
            </div>
          </div>
          <SheetClose>
            <X className="text-white" />
          </SheetClose>
        </SheetHeader>

        <div className="w-full h-[calc(100%-64px-64px)] flex flex-col gap-1 px-5 py-10">
          {navlinks.map((link, index) => (
            <div key={index}>
              {!link.comingSoon && (
                <NavLink
                  key={index}
                  to={link.url}
                  className={({isActive}) =>
                    cn(
                      'px-4 h-10 rounded-xl flex items-center gap-2.5 hover:bg-pashBlack-2/50',
                      isActive && 'bg-pashBlack-2',
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
                  <span className="text-sm text-pashBlack-3">{link.label}</span>
                  <span className="text-[8px] text-pink-1 p-1 rounded-[4px] bg-pink-2/30">
                    Coming soon
                  </span>
                </NavLink>
              )}
            </div>
          ))}
        </div>

        <footer className="w-full h-16 flex items-center px-5">
          <Button
            className="w-full justify-start bg-pashBlack-1 border border-pashBlack-2 hover:bg-pashBlack-2/50"
            onClick={logout}
          >
            <LogOut className="w-5 h-5 mr-2.5 text-white" />
            <span className="text-white">Logout</span>
          </Button>
        </footer>
      </SheetContent>
    </Sheet>
  );
};
