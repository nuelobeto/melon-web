import {DashboardLayout} from '@/components/layouts/dashboard-layout';
import {ROUTES} from '@/router/routes';
import {NavLink, Outlet} from 'react-router-dom';
import {TiBusinessCard} from 'react-icons/ti';
import {cn} from '@/lib/utils';
import {MdPerson} from 'react-icons/md';
import {RiBook2Line} from 'react-icons/ri';

export const Settings = () => {
  const navlinks = [
    {
      label: 'Profile',
      url: ROUTES.profileSettngs,
      icon: (className?: string) => <MdPerson className={className} />,
    },
    {
      label: 'Business',
      url: ROUTES.businessSettngs,
      icon: (className?: string) => <TiBusinessCard className={className} />,
    },
    {
      label: 'Guides',
      url: ROUTES.guides,
      icon: (className?: string) => <RiBook2Line className={className} />,
    },
  ];

  return (
    <DashboardLayout pageTitle="Settings">
      <nav className="px-5 py-4 flex items-center gap-3 overflow-auto sticky top-0 left-0 bg-white border-b border-mountainAsh-6 z-50">
        {navlinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.url}
            className={({isActive}) =>
              cn(
                'flex items-center gap-1.5 px-2.5 h-8 rounded-lg whitespace-nowrap',
                isActive
                  ? 'bg-pashBlack-1'
                  : 'bg-mountainAsh-9 hover:bg-mountainAsh-8',
              )
            }
          >
            {({isActive}) => (
              <>
                <span
                  className={cn(
                    'text-xl',
                    isActive ? 'text-white' : 'text-pashBlack-5',
                  )}
                >
                  {link.icon()}
                </span>
                <span
                  className={cn(
                    'text-sm font-medium',
                    isActive ? 'text-white' : 'text-pashBlack-5',
                  )}
                >
                  {link.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="pt-8 p-5">
        <Outlet />
      </div>
    </DashboardLayout>
  );
};
