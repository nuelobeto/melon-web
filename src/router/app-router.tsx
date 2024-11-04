import {Navigate, Route, Routes} from 'react-router-dom';
import {ROUTES} from './routes';
import {EnterPhone} from '@/pages/customer/auth/enter-phone';
import {VerifyEmailMobile} from '@/pages/customer/auth/verify-email';
import {VerifyPhoneMobile} from '@/pages/customer/auth/verify-phone';
import {DowloadApp} from '@/pages/customer/auth/dowload-app';
import ProtectedRoutes from '@/components/layouts/ProtectedRoutes';
import {NotFound} from '@/pages/404';
import {CreateAccount} from '@/pages/business/auth/create-account';
import {Login} from '@/pages/business/auth/login';
import {AccountVerified} from '@/pages/business/auth/account-verified';
import {VerifyEmail} from '@/pages/business/auth/verify-email';
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
import {CustomerRewardInterface} from '@/pages/business/dashboard/customer-reward-interface';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={ROUTES.login} replace={true} />} />

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
      <Route path={ROUTES.createAccount} element={<CreateAccount />} />
      <Route path={ROUTES.verifyEmail} element={<VerifyEmail />} />
      <Route path={ROUTES.login} element={<Login />} />
      <Route path={ROUTES.accountVerified} element={<AccountVerified />} />
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

        {/* settings */}
        <Route path={ROUTES.settings} element={<Home />} />

        {/* send reward */}
        <Route path={ROUTES.sendReward} element={<SendReward />} />
      </Route>

      <Route
        path={ROUTES.customerReward}
        element={<CustomerRewardInterface />}
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
