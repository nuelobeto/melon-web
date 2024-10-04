import {
  AccountSetUpLayout,
  Main,
  SideBar,
} from '@/components/layouts/account-setup-layout';
import {ScrollArea, ScrollBar} from '@/components/ui/scroll-area';
import {cn} from '@/lib/utils';
import {ROUTES} from '@/router/routes';
import {useEffect, useState} from 'react';
import {NavLink, Outlet, useLocation} from 'react-router-dom';

type StepKey = 'personal' | 'business' | 'director';

interface NavLink {
  label: string;
  url: string;
  key: StepKey;
}

export const BusinessOnboarding = () => {
  const [completedSteps, setCompletedSteps] = useState<StepKey[]>([]);
  const location = useLocation();

  const navlinks: NavLink[] = [
    {
      label: 'Personal Details',
      url: ROUTES.businessPersonalDetails,
      key: 'personal',
    },
    {
      label: 'Business Details',
      url: ROUTES.businessDetails,
      key: 'business',
    },
    {
      label: `Director's Details`,
      url: ROUTES.businessDirectorDetails,
      key: 'director',
    },
  ];

  const isStepCompletedOrActive = (stepKey: StepKey) => {
    const currentStepIndex = navlinks.findIndex(
      link => link.url === location.pathname,
    );
    const stepIndex = navlinks.findIndex(link => link.key === stepKey);

    return completedSteps.includes(stepKey) || stepIndex === currentStepIndex;
  };

  useEffect(() => {
    setCompletedSteps(['personal', 'business', 'director']);
  }, []);

  return (
    <AccountSetUpLayout>
      <SideBar>
        <SidebarContent
          navlinks={navlinks}
          isStepCompletedOrActive={isStepCompletedOrActive}
        />
      </SideBar>
      <Main>
        <MobileNav
          navlinks={navlinks}
          isStepCompletedOrActive={isStepCompletedOrActive}
        />
        <Outlet />
      </Main>
    </AccountSetUpLayout>
  );
};

const SidebarContent = ({
  navlinks,
  isStepCompletedOrActive,
}: {
  navlinks: NavLink[];
  isStepCompletedOrActive: (stepKey: StepKey) => boolean;
}) => {
  return (
    <div className="flex flex-col gap-7 relative pl-2 pt-2">
      <div className="absolute w-10 h-36 rounded-full bg-mountainAsh-5 left-0 top-0" />
      {navlinks.map((link, index) => (
        <NavLink
          key={index}
          to={link.url}
          className={({isActive}) =>
            cn(
              'flex items-center gap-4 whitespace-nowrap relative z-10',
              isStepCompletedOrActive(link.key) ||
                (!isActive && 'pointer-events-none cursor-not-allowed'),
            )
          }
        >
          {({isActive}) => (
            <>
              <span
                className={cn(
                  'w-6 h-6 rounded-full text-white flex items-center justify-center text-xs',
                  isStepCompletedOrActive(link.key) || isActive
                    ? 'bg-pashBlack-1'
                    : 'bg-pashBlack-8',
                )}
              >
                {index + 1}
              </span>
              <span
                className={cn(
                  'text-sm',
                  isStepCompletedOrActive(link.key) || isActive
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

const MobileNav = ({
  navlinks,
  isStepCompletedOrActive,
}: {
  navlinks: NavLink[];
  isStepCompletedOrActive: (stepKey: StepKey) => boolean;
}) => {
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
                  isStepCompletedOrActive(link.key) || isActive
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
                      isStepCompletedOrActive(link.key) || isActive
                        ? 'bg-pashBlack-1'
                        : 'bg-pashBlack-8',
                    )}
                  >
                    {index + 1}
                  </span>
                  <span
                    className={cn(
                      isStepCompletedOrActive(link.key) || isActive
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
