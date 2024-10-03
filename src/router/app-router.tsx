import {Navigate, Route, Routes} from 'react-router-dom';
import {ROUTES} from './routes';
import {EnterPhone} from '@/pages/customer/auth/enter-phone';
import {VerifyEmailMobile} from '@/pages/customer/auth/verify-email';
import {VerifyPhoneMobile} from '@/pages/customer/auth/verify-phone';
import {DowloadApp} from '@/pages/customer/auth/dowload-app';
import {WidgetTest} from '@/pages/widget-test';
import {CreateBusinessAccount} from '@/pages/business/auth/create-business-account';
import {BusinessSignIn} from '@/pages/business/auth/business-sign-in';
import {VerifyBusinessAccount} from '@/pages/business/auth/verify-business-account';
import {BusinessAccountVerified} from '@/pages/business/auth/business-account-verified';
import {BusinessPersonalDetails} from '@/pages/business/onboarding/business-personal-details';

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={ROUTES.createBusinessAccount} replace={true} />}
      />

      {/* customer onboarding */}
      <Route path={ROUTES.verifyEmailMobile} element={<VerifyEmailMobile />} />
      <Route path={ROUTES.referralCreateAccount} element={<EnterPhone />} />
      <Route path={ROUTES.verifyPhoneMobile} element={<VerifyPhoneMobile />} />
      <Route
        path={ROUTES.verifyPhoneMobileFromWidget}
        element={<VerifyPhoneMobile />}
      />
      <Route path={ROUTES.downloadApp} element={<DowloadApp />} />

      {/* BUSINESS */}
      {/* create account  */}
      <Route
        path={ROUTES.createBusinessAccount}
        element={<CreateBusinessAccount />}
      />
      <Route
        path={ROUTES.verifyBusinessAccount}
        element={<VerifyBusinessAccount />}
      />
      <Route path={ROUTES.businessSignIn} element={<BusinessSignIn />} />
      <Route
        path={ROUTES.businessAccountVerified}
        element={<BusinessAccountVerified />}
      />
      <Route
        path={ROUTES.businessPersonalDetails}
        element={<BusinessPersonalDetails />}
      />

      <Route path={'/widget'} element={<WidgetTest />} />
    </Routes>
  );
};

export default AppRouter;
