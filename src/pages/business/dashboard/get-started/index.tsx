import {DashboardLayout} from '@/components/layouts/dashboard';
import {SelectBusinessType} from './select-business-type';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '@/router/routes';

export const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout pageTitle="Get Started">
      <div className="w-full min-h-full px-7 py-9 bg-[#F5F6F8]">
        <div className="w-full max-w-[874px] mx-auto bg-white py-5 sm:py-10 px-5 sm:px-14 rounded-[22px]">
          <div>
            <h1 className="font-semibold text-2xl sm:text-[32px] text-pashBlack-1">
              Welcome to Melon Jane Doe
            </h1>
            <p className="mt-2 text-pashBlack-6">
              Complete this steps to fully get started
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="bg-[#F5F6F8] pt-3 px-3 pb-5 rounded-2xl">
                <img
                  src="/images/integrate-widget.svg"
                  alt=""
                  className="w-full block"
                />
                <h2 className="text-xl sm:text-2xl font-medium text-pashBlack-1">
                  Integrate Melon <br /> Widget
                </h2>
                <p className="mt-2 text-pashBlack-6">
                  Automatically reward your customers after every paid
                  transaction. Setup is simple, and our team is here to help
                  every step of the way!
                </p>

                <button
                  className="w-full h-10 rounded-lg border border-mountainAsh-1 bg-gradient-to-b from-[#F5F6F8] to-[#d2d9e99e] mt-3 font-medium text-sm"
                  onClick={() => navigate(ROUTES.docs)}
                >
                  See Documentation
                </button>
              </div>

              <div className="bg-[#F5F6F8] pt-3 px-3 pb-5 rounded-2xl">
                <img
                  src="/images/complete-registration.svg"
                  alt=""
                  className="w-full block"
                />
                <h2 className="text-xl sm:text-2xl font-medium text-pashBlack-1">
                  Complete Business <br /> Registration
                </h2>
                <p className="mt-2 text-pashBlack-6">
                  Complete your business registration with Melon in a few easy
                  steps and start offering rewards to your customers right away.
                </p>

                <SelectBusinessType>
                  <button className="w-full h-10 rounded-lg border border-mountainAsh-1 bg-gradient-to-b from-[#F5F6F8] to-[#d2d9e99e] mt-3 font-medium text-sm">
                    Complete Registration
                  </button>
                </SelectBusinessType>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h1 className="font-semibold text-2xl sm:text-[32px] text-pashBlack-1">
              Learn More
            </h1>
            <p className="mt-2 text-pashBlack-6">
              Complete this steps to fully get started
            </p>
            <div className="mt-4 rounded-2xl bg-[#F5F6F8] py-[18px] px-5 flex flex-col sm:flex-row sm:items-center gap-5">
              <img
                src="/images/get-started-learn-more.png"
                alt=""
                className="w-full block sm:max-w-[239px] rounded-[13px]"
              />
              <div className="grow">
                <h2 className="text-xl sm:text-2xl font-medium text-pashBlack-1">
                  Quick Video Tips
                </h2>
                <p className="mt-2 text-pashBlack-6">
                  Watch our quick videos for step-by-step guides on widget
                  integration, completing business registration, and helping
                  customers earn points.
                </p>
                <SelectBusinessType>
                  <button className="w-full sm:w-[200px] h-10 rounded-lg border border-mountainAsh-1 bg-gradient-to-b from-[#F5F6F8] to-[#d2d9e99e] mt-3 font-medium text-sm">
                    Complete Registration
                  </button>
                </SelectBusinessType>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
