import {
  AccountSetUpLayout,
  Main,
  SideBar,
} from '@/components/layouts/account-setup-layout';
import {ScrollArea, ScrollBar} from '@/components/ui/scroll-area';
import {cn} from '@/lib/utils';
import {ROUTES} from '@/router/routes';
import {NavLink, Outlet} from 'react-router-dom';

type NavLink = {
  label: string;
  url: string;
};

export const BusinessOnboarding = () => {
  const navlinks: NavLink[] = [
    {
      label: 'Personal Details',
      url: ROUTES.businessPersonalDetails,
    },
    {
      label: 'Business Details',
      url: ROUTES.businessDetails,
    },
    {
      label: `Director's Details`,
      url: ROUTES.businessDirectorDetails,
    },
  ];

  return (
    <AccountSetUpLayout>
      <SideBar>
        <SidebarContent navlinks={navlinks} />
      </SideBar>
      <Main>
        <MobileNav navlinks={navlinks} />
        <Outlet />
      </Main>
    </AccountSetUpLayout>
  );
};

const SidebarContent = ({navlinks}: {navlinks: NavLink[]}) => {
  return (
    <div className="flex flex-col gap-7 relative pl-2 pt-2">
      <div className="absolute w-10 h-36 rounded-full bg-mountainAsh-5 left-0 top-0" />
      {navlinks.map((link, index) => (
        <NavLink
          key={index}
          to={link.url}
          className={() =>
            cn('flex items-center gap-4 whitespace-nowrap relative z-10')
          }
        >
          {({isActive}) => (
            <>
              <span
                className={cn(
                  'w-6 h-6 rounded-full text-white flex items-center justify-center text-xs',
                  isActive ? 'bg-pashBlack-1' : 'bg-pashBlack-8',
                )}
              >
                {index + 1}
              </span>
              <span
                className={cn(
                  'text-sm',
                  isActive
                    ? 'font-medium text-pashBlack-1'
                    : 'font-normal text-pashBlack-7',
                )}
              >
                {link.label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
};

const MobileNav = ({navlinks}: {navlinks: NavLink[]}) => {
  return (
    <nav className="w-screen border-b border-mountainAsh-7 md:hidden sticky top-0 left-0 bg-white">
      <ScrollArea className="w-screen">
        <div className="flex items-center gap-2 p-5">
          {navlinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.url}
              className={({isActive}) =>
                cn(
                  'flex items-center gap-2 whitespace-nowrap border border-mountainAsh-8 h-10 pl-2 pr-2.5 rounded-full',
                  isActive
                    ? 'bg-mountainAsh-9'
                    : 'bg-white pointer-events-none cursor-not-allowed',
                )
              }
            >
              {({isActive}) => (
                <>
                  <span
                    className={cn(
                      'w-6 h-6 rounded-full text-white flex items-center justify-center text-xs',
                      isActive ? 'bg-pashBlack-1' : 'bg-pashBlack-8',
                    )}
                  >
                    {index + 1}
                  </span>
                  <span
                    className={cn(
                      isActive
                        ? 'font-medium text-pashBlack-1'
                        : 'font-normal text-pashBlack-7',
                    )}
                  >
                    {link.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </nav>
  );
};
