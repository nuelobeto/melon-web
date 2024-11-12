import {DashboardLayout} from '@/components/layouts/dashboard';
import {cn} from '@/lib/utils';
import {ROUTES} from '@/router/routes';
import {NavLink, Outlet} from 'react-router-dom';

const navlinks = [
  {
    label: 'Personal Profile',
    url: ROUTES.personalSettings,
  },
  {
    label: 'Business Profile',
    url: ROUTES.businessSettings,
  },
];

export const Settings = () => {
  return (
    <DashboardLayout pageTitle="Settings">
      <div className="px-7 py-9 bg-[#F5F6F8] min-h-full">
        <div className="w-full max-w-[621px]">
          <nav className="py-3 px-4 bg-white rounded-[16px]">
            <div className="p-3 bg-mountainAsh-9 rounded-xl flex items-center gap-2.5">
              {navlinks.map((link, index) => (
                <NavLink
                  to={link.url}
                  key={index}
                  className={({isActive}) =>
                    cn(
                      'h-[46px] px-4 rounded-[16px] flex items-center justify-center text-[#333641] text-sm font-medium',
                      isActive && 'bg-white',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </nav>

          <div className="mt-6">
            <Outlet />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
