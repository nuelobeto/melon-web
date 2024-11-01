import {DashboardLayout} from '@/components/layouts/dashboard';
import {cn} from '@/lib/utils';
import {ArrowLeft} from 'lucide-react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {QrCode} from './qr-code';
import {Manual} from './manual';

type TabValue = 'qr_code' | 'enter_details';

type Tab = {
  label: string;
  value: TabValue;
};

const tabs: Tab[] = [
  {
    label: 'QR Code',
    value: 'qr_code',
  },
  {
    label: 'Enter Details',
    value: 'enter_details',
  },
];

export const SendReward = () => {
  const [currentTab, setCurrentTab] = useState<TabValue>('qr_code');

  return (
    <DashboardLayout pageTitle={<PageTitle />}>
      <div className="w-full h-[calc(100vh-64px)] px-7 py-9 bg-[#F5F6F8]">
        <div className="w-[602px] h-full mx-auto">
          <div className="py-3 px-4 rounded-2xl bg-white">
            <nav className="flex items-center gap-2.5 p-3 bg-mountainAsh-9 rounded-xl">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  className={cn(
                    'w-1/2 flex items-center justify-center h-[54px] rounded-2xl text-pashBlack-1 font-medium',
                    tab.value === currentTab ? 'bg-white' : 'bg-transparent',
                  )}
                  onClick={() => setCurrentTab(tab.value)}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {currentTab === 'qr_code' && <QrCode />}
          {currentTab === 'enter_details' && <Manual />}
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
      <span>Activate Reward Points</span>
    </>
  );
};
