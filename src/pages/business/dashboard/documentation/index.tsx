import {DashboardLayout} from '@/components/layouts/dashboard';
import {cn} from '@/lib/utils';
import {ROUTES} from '@/router/routes';
import {ArrowLeft} from 'lucide-react';
import {NavLink, Outlet, useNavigate} from 'react-router-dom';

const navLinks = [
  {
    label: 'Web',
    url: ROUTES.webDocs,
  },
  {
    label: 'Mobile',
    url: ROUTES.mobileDocs,
  },
];

export const Documentation = () => {
  return (
    <DashboardLayout pageTitle={<PageTitle />}>
      <div className="w-full min-h-full px-7 py-9 bg-[#F5F6F8]">
        <div className="w-full max-w-[800px] mx-auto pb-12">
          <h2 className="font-semibold text-3xl text-pashBlack-1 mb-6">
            Melon Widget Integration Guide
          </h2>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-2xl text-pashBlack-1">
                Overview
              </h3>
              <p className="text-pashBlack-3">
                The Melon Widget is a popup component that allows you to display
                receipt information in a customizable interface and
                simultaneously send the receipt data to Melon's servers for
                processing and storage. This guide will walk you through the
                integration process and explain all available options.
              </p>
            </div>

            <nav className="w-full border-b border-mountainAsh-6 flex items-center">
              {navLinks.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.url}
                  className={({isActive}) =>
                    cn(
                      'p-2.5 border-b-2',
                      isActive
                        ? 'text-pashBlack-1 border-pashBlack-1'
                        : 'text-pashBlack-5 border-transparent',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <Outlet />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const PageTitle = () => {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate(-1)}>
        <ArrowLeft className="w-5 h-5" />
      </button>
      <span>Documentation</span>
    </>
  );
};
