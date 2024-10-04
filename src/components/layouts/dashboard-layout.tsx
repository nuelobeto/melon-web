import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {BellIcon, HomeIcon, SettingsIcon} from '../ui/icons';
import {NavLink} from 'react-router-dom';
import {cn} from '@/lib/utils';
import {ROUTES} from '@/router/routes';
import {ScrollArea} from '../ui/scroll-area';

export const DashboardLayout = ({
  children,
  pageTitle,
}: {
  children: React.ReactNode;
  pageTitle: string;
}) => {
  return (
    <div className="flex w-screen h-screen">
      <SideBar />
      <div className="w-full min-[900px]w-[calc(100vw-256px)] h-full">
        <header className="w-full h-16 border-b border-mountainAsh-6 flex items-center justify-between px-5">
          <h1 className="font-medium text-xl text-pashBlack-1">{pageTitle}</h1>
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-mountainAsh-8 flex items-center justify-center">
              <BellIcon />
            </div>
            <div className="w-11 h-11 rounded-full">
              <Avatar className="w-full h-full">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>EO</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>
        <main className="w-full h-[calc(100%-64px)]">
          <ScrollArea className="w-full h-full">
            <div className="p-6">{children}</div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

export const SideBar = () => {
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
  ];

  return (
    <aside className="min-w-64 h-full bg-pashBlack-1 hidden min-[900px]:block">
      <header className="w-full h-16 flex items-center justify-between px-5">
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://img.utdstc.com/icon/7a5/139/7a5139596d44edaaa15e1a74ed1202442466026aecf262085e3b4cee0061dee6:200" />
            <AvatarFallback className="text-pashBlack-1">J</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h2 className="font-medium text-base text-white">Sundry foods</h2>
            <p className="text-xs text-mountainAsh-1">Jane Doe</p>
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-1 px-5 mt-11">
        {navlinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.url}
            className={({isActive}) =>
              cn(
                'px-4 h-12 rounded-xl flex items-center gap-2.5 hover:bg-pashBlack-2/50',
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
              </>
            )}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};
