import {DashboardLayout} from '@/components/layouts/dashboard';
import {cn} from '@/lib/utils';
import {ArrowLeft} from 'lucide-react';
import {useEffect, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {IdentityVerification} from '../identity-verification';
import {BusinessSocials} from '../business_socials';
import {BusinessDetails} from '../business-details';

export type SectionValueT =
  | 'identity_verification'
  | 'business_details'
  | 'business_socials'
  | 'directors_details';

type SectionT = {
  label: string;
  value: SectionValueT;
};

const sections: SectionT[] = [
  {
    label: 'Identity Verification',
    value: 'identity_verification',
  },
  {
    label: 'Business Details',
    value: 'business_details',
  },
  {
    label: 'Business Socials',
    value: 'business_socials',
  },
];

export const UnRegisteredBusinessRegistration = () => {
  const [currentSection, setCurrentSection] = useState<SectionValueT>(
    'identity_verification',
  );

  const completed: SectionValueT[] = useMemo(() => {
    return ['identity_verification', 'business_details'];
  }, []);

  useEffect(() => {
    const lastCompletedIndex =
      completed.length > 0
        ? sections.findIndex(
            section => section.value === completed[completed.length - 1],
          )
        : -1;
    const nextSectionIndex = lastCompletedIndex + 1;

    if (nextSectionIndex < sections.length) {
      setCurrentSection(sections[nextSectionIndex].value);
    }
  }, [completed]);

  return (
    <DashboardLayout pageTitle={<PageTitle />}>
      <div className="w-full h-[calc(100vh-64px)] px-7 py-9 bg-[#F5F6F8]">
        <div className="w-full h-full max-w-[602px] mx-auto">
          <nav className="py-4 px-6 flex items-center gap-7 rounded-full bg-white">
            {sections.map((section, index) => {
              const isDisabled = sections
                .slice(0, index)
                .some(prevSection => !completed.includes(prevSection.value));

              return (
                <button
                  key={index}
                  className={cn(
                    'flex items-center gap-[18px] whitespace-nowrap',
                    section.value === currentSection
                      ? 'text-pashBlack-1 font-medium'
                      : 'text-pashBlack-7',
                    isDisabled ? 'pointer-events-none' : '',
                  )}
                  onClick={() => setCurrentSection(section.value)}
                >
                  <span
                    className={cn(
                      'w-6 h-6 flex items-center justify-center rounded-full text-[#F1F5F9] text-xs',
                      section.value === currentSection
                        ? 'bg-pashBlack-1'
                        : 'bg-pashBlack-8',
                    )}
                  >
                    {index + 1}
                  </span>
                  {section.label}
                </button>
              );
            })}
          </nav>

          <div className="h-[calc(100%-56px-24px)]">
            {currentSection === 'identity_verification' && (
              <IdentityVerification />
            )}
            {currentSection === 'business_details' && (
              <BusinessDetails setCurrentSection={setCurrentSection} />
            )}
            {currentSection === 'business_socials' && (
              <BusinessSocials
                setCurrentSection={setCurrentSection}
                business_type="unregistered"
              />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export const PageTitle = () => {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate(-1)}>
        <ArrowLeft className="w-5 h-5" />
      </button>
      <span>Complete Business Registration</span>
    </>
  );
};
