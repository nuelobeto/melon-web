import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {HomeIcon, SettingsIcon} from '../ui/icons';
import {NavLink, useNavigate} from 'react-router-dom';
import {cn} from '@/lib/utils';
import {ROUTES} from '@/router/routes';
import {ScrollArea} from '../ui/scroll-area';
import {RiNotification3Line} from 'react-icons/ri';
import {HiOutlineMenuAlt2} from 'react-icons/hi';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {LogOut, X} from 'lucide-react';
import {RiGiftLine, RiBarChartLine} from 'react-icons/ri';
import {Button} from '../ui/button';
import {useAuth} from '@/store/useAuth';
import {useBusiness} from '@/store/useBusiness';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {useFetchPersonalDetails} from '@/hooks/business';

export const DashboardLayout = ({
  children,
  pageTitle,
}: {
  children: React.ReactNode;
  pageTitle: string;
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex w-screen h-screen">
      <SideBar />
      <div className="w-full min-[900px]w-[calc(100vw-256px)] h-full">
        <header className="w-full h-16 border-b border-mountainAsh-6 flex items-center justify-between px-5">
          <div className="flex items-center gap-4">
            <div className="min-[900px]:hidden">
              <MobileSidebar>
                <button>
                  <HiOutlineMenuAlt2 className="text-2xl" />
                </button>
              </MobileSidebar>
            </div>
            <h1 className="font-medium text-xl text-pashBlack-1">
              {pageTitle}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={() => navigate(ROUTES.sendCustomerReceipt)}>
              Send customer rewards
            </Button>
            <Notifications>
              <button className="w-11 h-11 rounded-full bg-mountainAsh-8 flex items-center justify-center">
                <RiNotification3Line className="text-2xl" />
              </button>
            </Notifications>
            <div className="w-11 h-11 rounded-full">
              <Avatar className="w-full h-full">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>EO</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>
        <main className="w-full h-[calc(100%-64px)]">
          <ScrollArea className="w-full h-full">{children}</ScrollArea>
        </main>
      </div>
    </div>
  );
};

const navlinks = [
  {
    label: 'Home',
    url: ROUTES.home,
    icon: (className?: string) => (
      <HomeIcon className={className ? className : ''} />
    ),
  },
  {
    label: 'Settings',
    url: ROUTES.settings,
    icon: (className?: string) => (
      <SettingsIcon className={className ? className : ''} />
    ),
  },
  {
    label: 'Insights',
    url: 'insights',
    icon: (className?: string) => (
      <RiBarChartLine className={className ? className : ''} />
    ),
    comingSoon: true,
  },
  {
    label: 'Offers',
    url: 'offers',
    icon: (className?: string) => (
      <RiGiftLine className={cn('text-xl', className)} />
    ),
    comingSoon: true,
  },
];

export const SideBar = () => {
  const {logout} = useAuth();
  const {business, personalDetails} = useBusiness();

  useFetchPersonalDetails();

  return (
    <aside className="min-w-64 h-full bg-pashBlack-1 hidden min-[900px]:block">
      <header className="w-full h-16 flex items-center justify-between px-5">
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={business?.logo ?? undefined} />
            <AvatarFallback className="text-pashBlack-1">
              {business?.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h2 className="font-medium text-base text-white">
              {business?.name}
            </h2>
            <p className="text-xs text-mountainAsh-1">
              {personalDetails?.first_name} {personalDetails?.last_name}
            </p>
          </div>
        </div>
      </header>

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
                    {link.icon(isActive ? 'fill-white' : 'fill-pashBlack-8')}
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
                {link.icon('fill-pashBlack-3')}
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
    </aside>
  );
};

const MobileSidebar = ({children}: {children: React.ReactNode}) => {
  const {logout} = useAuth();
  const {business, personalDetails} = useBusiness();

  useFetchPersonalDetails();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side={'left'}
        className="w-full max-w-[350px] bg-pashBlack-1 border-none p-0"
      >
        <SheetHeader className="w-full h-16 flex flex-row items-center justify-between px-5 space-y-0 ">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={business?.logo ?? undefined} />
              <AvatarFallback className="text-pashBlack-1">
                {business?.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <SheetTitle className="font-medium text-base text-white">
                {business?.name}
              </SheetTitle>
              <SheetDescription className="text-xs text-mountainAsh-1 text-left">
                {personalDetails?.first_name} {personalDetails?.last_name}
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
                      {link.icon(isActive ? 'fill-white' : 'fill-pashBlack-8')}
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
                  {link.icon('fill-pashBlack-3')}
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

const Notifications = ({children}: {children: React.ReactNode}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align="start"
        alignOffset={-350}
        className="w-screen max-w-[450px] max-h-screen h-[calc(100vh-70px)]"
      ></PopoverContent>
    </Popover>
  );
};
