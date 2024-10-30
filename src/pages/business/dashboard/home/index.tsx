import {DashboardLayout} from '@/components/layouts/dashboard';
import {Button} from '@/components/ui/button';
import {RecentTransactions} from './recent-transactions';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '@/router/routes';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout pageTitle="Home">
      <div className="w-full min-h-full px-7 py-9 bg-[#F5F6F8]">
        <div className="p-6 rounded-3xl bg-white grid grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-[#F5F6F8]">
            <img src="/images/social-vendor.svg" alt="" className="block" />
            <h2 className="text-3xl font-semibold text-pashBlack-1 mt-2">
              Selling on Social Media?
            </h2>
            <p className="text-pashBlack-2 leading-5 mt-2">
              No worries, you can click the button below to reward your
              customers or create a store front and have an ordering website
              where people can order and buy stuff
            </p>
            <div className="w-full max-w-[422px] flex items-center gap-4 mt-4">
              <Button
                className="w-1/2 rounded-lg"
                onClick={() => navigate(ROUTES.sendReward)}
              >
                Send Reward
              </Button>
              <Button variant={'secondary'} className="w-1/2 rounded-lg">
                Create Storefront
              </Button>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-b from-[#FFE0D4] to-[#E1C6F1] relative">
            <span className="absolute top-5 right-5 text-xs text-[#F47243] bg-[#FFC6B1] h-[25px] flex items-center justify-center px-[6.5px] rounded-[5px]">
              Coming Soon
            </span>
            <img src="/images/launch-offers.svg" alt="" className="block" />
            <h2 className="text-3xl font-semibold text-pashBlack-1 mt-2">
              Launch Offers and campaigns
            </h2>
            <p className="text-pashBlack-2 leading-5 mt-2">
              Lorem ipsum dolor sit amet consectetur. Varius at integer
              consequat amet tortor. Eu id scelerisque tincidunt fermentum quam
              felis fusce odio pulvinar. Sed non quis scelerisque.
            </p>
            <div className="mt-4">
              <Button className="w-[203px] rounded-lg bg-[#0A1C2C] text-white hover:bg-[#0A1C2C] border-transparent">
                Learn More
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white mt-6">
          <h2 className="text-2xl font-semibold text-pashBlack-1">Overview</h2>
          <div className="grid grid-cols-3 gap-[14px] mt-4">
            <div className="py-5 px-3 rounded-[10px] bg-mountainAsh-10">
              <h3 className="text-base font-semibold text-pashBlack-1">
                Total Customer
              </h3>
              <p className="text-sm text-pashBlack-5 mt-1">
                Total number of customers
              </p>
              <p className="text-pashBlack-1 mt-3 text-3xl font-semibold">
                200
              </p>
            </div>
            <div className="py-5 px-3 rounded-[10px] bg-mountainAsh-10">
              <h3 className="text-base font-semibold text-pashBlack-1">
                Total Transaction volume
              </h3>
              <p className="text-sm text-pashBlack-5 mt-1">
                Total number of customers
              </p>
              <p className="text-pashBlack-1 mt-3 text-3xl font-semibold">
                200
              </p>
            </div>
            <div className="py-5 px-3 rounded-[10px] bg-mountainAsh-10">
              <h3 className="text-base font-semibold text-pashBlack-1">
                Total Points earned
              </h3>
              <p className="text-sm text-pashBlack-5 mt-1">
                Total number of customers
              </p>
              <p className="text-pashBlack-1 mt-3 text-3xl font-semibold">
                200
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-white mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-pashBlack-1">
              Recent Transactions
            </h2>
            <button
              className="text-pashBlack-3 underline"
              onClick={() => navigate(ROUTES.transactions)}
            >
              View all
            </button>
          </div>

          <RecentTransactions />
        </div>
      </div>
    </DashboardLayout>
  );
};
