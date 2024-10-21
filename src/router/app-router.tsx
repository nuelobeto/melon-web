import {Navigate, Route, Routes} from 'react-router-dom';
import {ROUTES} from './routes';
import {EnterPhone} from '@/pages/customer/auth/enter-phone';
import {VerifyEmailMobile} from '@/pages/customer/auth/verify-email';
import {VerifyPhoneMobile} from '@/pages/customer/auth/verify-phone';
import {DowloadApp} from '@/pages/customer/auth/dowload-app';
import {CreateBusinessAccount} from '@/pages/business/auth/create-business-account';
import {BusinessSignIn} from '@/pages/business/auth/business-sign-in';
import {VerifyBusinessAccount} from '@/pages/business/auth/verify-business-account';
import {BusinessAccountVerified} from '@/pages/business/auth/business-account-verified';
import {BusinessPersonalDetails} from '@/pages/business/onboarding/business-personal-details';
import {BusinessOnboarding} from '@/pages/business/onboarding/business-onboarding';
import {BusinessDetails} from '@/pages/business/onboarding/business-details';
import {BusinessDirectorDetails} from '@/pages/business/onboarding/business-director-details';
import {BusinessOnboardingSuccess} from '@/pages/business/onboarding/business-onboarding-success';
import {Home} from '@/pages/business/dashboard/home';
import {Settings} from '@/pages/business/dashboard/settings/settings';
import {ProfileSettings} from '@/pages/business/dashboard/settings/profile';
import {BusinessSettings} from '@/pages/business/dashboard/settings/business';
import {Guides} from '@/pages/business/dashboard/settings/guides/guides';
import {WebGuide} from '@/pages/business/dashboard/settings/guides/web-guide';
import {MobileGuide} from '@/pages/business/dashboard/settings/guides/mobile-guide';
import {VerifyDirectorPhone} from '@/pages/business/onboarding/verify-director-phone';
import ProtectedRoutes from '@/components/layouts/ProtectedRoutes';
import {NotFound} from '@/pages/404';
import {SendCustomerReceipt} from '@/pages/business/send-customer-receipt';
import {ForgotBusinessPassword} from '@/pages/business/auth/forgot-business-password';

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
      {/* Auth  */}
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
        path={ROUTES.forgotBusinessPassword}
        element={<ForgotBusinessPassword />}
      />
      <Route
        path={ROUTES.businessAccountVerified}
        element={<BusinessAccountVerified />}
      />

      {/* Onboarding */}
      <Route path={ROUTES.businessOnboarding} element={<BusinessOnboarding />}>
        <Route
          path=""
          element={
            <Navigate to={ROUTES.businessPersonalDetails} replace={true} />
          }
        />
        <Route
          path={ROUTES.businessPersonalDetails}
          element={<BusinessPersonalDetails />}
        />
        <Route path={ROUTES.businessDetails} element={<BusinessDetails />} />
        <Route
          path={ROUTES.businessDirectorDetails}
          element={<BusinessDirectorDetails />}
        />
      </Route>
      <Route
        path={ROUTES.verifyDirectorPhone}
        element={<VerifyDirectorPhone />}
      />
      <Route
        path={ROUTES.businessOnboardingSuccess}
        element={<BusinessOnboardingSuccess />}
      />

      <Route element={<ProtectedRoutes />}>
        {/* Dashboard */}
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.settings} element={<Settings />}>
          <Route
            path=""
            element={<Navigate to={ROUTES.profileSettngs} replace={true} />}
          />
          <Route path={ROUTES.profileSettngs} element={<ProfileSettings />} />
          <Route path={ROUTES.businessSettngs} element={<BusinessSettings />} />
          <Route path={ROUTES.guides} element={<Guides />}>
            <Route
              path=""
              element={
                <Navigate to={ROUTES.webWidgetIntegration} replace={true} />
              }
            />
            <Route path={ROUTES.webWidgetIntegration} element={<WebGuide />} />
            <Route
              path={ROUTES.mobileWidgetIntegration}
              element={<MobileGuide />}
            />
          </Route>
        </Route>
        <Route
          path={ROUTES.sendCustomerReceipt}
          element={<SendCustomerReceipt />}
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
