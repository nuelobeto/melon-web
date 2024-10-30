import {Navigate, Route, Routes} from 'react-router-dom';
import {ROUTES} from './routes';
import {EnterPhone} from '@/pages/customer/auth/enter-phone';
import {VerifyEmailMobile} from '@/pages/customer/auth/verify-email';
import {VerifyPhoneMobile} from '@/pages/customer/auth/verify-phone';
import {DowloadApp} from '@/pages/customer/auth/dowload-app';
import {Settings} from '@/pages/business/dashboard/settings/settings';
import {ProfileSettings} from '@/pages/business/dashboard/settings/profile';
import {BusinessSettings} from '@/pages/business/dashboard/settings/business';
import {Guides} from '@/pages/business/dashboard/settings/guides/guides';
import {WebGuide} from '@/pages/business/dashboard/settings/guides/web-guide';
import {MobileGuide} from '@/pages/business/dashboard/settings/guides/mobile-guide';
import ProtectedRoutes from '@/components/layouts/ProtectedRoutes';
import {NotFound} from '@/pages/404';
import {SendCustomerReceipt} from '@/pages/business/send-customer-receipt';
import {CreateBusinessAccount} from '@/pages/business/auth/create-account';
import {BusinessSignIn} from '@/pages/business/auth/login';
import {BusinessAccountVerified} from '@/pages/business/auth/account-verified';
import {VerifyBusinessAccount} from '@/pages/business/auth/verify-email';
import {ForgotPassword} from '@/pages/business/auth/forgot-password';
import {ForgotPasswordSuccess} from '@/pages/business/auth/forgot-password-success';
import {ResetPassword} from '@/pages/business/auth/reset-password';
import {GetStarted} from '@/pages/business/dashboard/get-started';
import {RegisteredBusinessRegistration} from '@/pages/business/dashboard/onboarding/registered-business';
import {VerifyDirector} from '@/pages/business/dashboard/onboarding/verify-director';
import {UnRegisteredBusinessRegistration} from '@/pages/business/dashboard/onboarding/unregistered-business';
import {RegistrationSuccess} from '@/pages/business/dashboard/onboarding/registration-success';
import {VerifyOwner} from '@/pages/business/dashboard/onboarding/verify-owner';
import {Documentation} from '@/pages/business/dashboard/documentation';
import {WebDocs} from '@/pages/business/dashboard/documentation/web';
import {MobileDocs} from '@/pages/business/dashboard/documentation/mobile';
import {Home} from '@/pages/business/dashboard/home';
import {Transactions} from '@/pages/business/dashboard/transactions';
import {SendReward} from '@/pages/business/dashboard/send-reward';

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={ROUTES.businessSignIn} replace={true} />}
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
        path={ROUTES.businessAccountVerified}
        element={<BusinessAccountVerified />}
      />
      <Route
        path={ROUTES.businessAccountVerified}
        element={<BusinessAccountVerified />}
      />
      <Route
        path={ROUTES.forgotBusinessPassword}
        element={<ForgotPassword />}
      />
      <Route
        path={ROUTES.forgotPasswordSuccess}
        element={<ForgotPasswordSuccess />}
      />
      <Route path={ROUTES.resetPassword} element={<ResetPassword />} />

      <Route element={<ProtectedRoutes />}>
        {/* get started */}
        <Route path={ROUTES.getStarted} element={<GetStarted />} />

        {/* registration */}
        <Route
          path={ROUTES.registeredBusinessRegistration}
          element={<RegisteredBusinessRegistration />}
        />

        <Route
          path={ROUTES.unRegisteredBusinessRegistration}
          element={<UnRegisteredBusinessRegistration />}
        />

        <Route path={ROUTES.verifyDirectorPhone} element={<VerifyDirector />} />

        <Route path={ROUTES.verifyOwnerPhone} element={<VerifyOwner />} />

        <Route
          path={ROUTES.registrationSuccess}
          element={<RegistrationSuccess />}
        />

        {/* docs */}
        <Route path={ROUTES.docs} element={<Documentation />}>
          <Route
            path=""
            element={<Navigate to={ROUTES.webDocs} replace={true} />}
          />
          <Route path={ROUTES.webDocs} element={<WebDocs />} />
          <Route path={ROUTES.mobileDocs} element={<MobileDocs />} />
        </Route>

        {/* home */}
        <Route path={ROUTES.home} element={<Home />} />

        {/* transactions */}
        <Route path={ROUTES.transactions} element={<Transactions />} />

        {/* send reward */}
        <Route path={ROUTES.sendReward} element={<SendReward />} />

        {/* settings */}
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
