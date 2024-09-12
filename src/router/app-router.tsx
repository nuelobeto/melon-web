import {EnterPhone} from '@/pages/onboarding/mobile/enter-phone';
import {Navigate, Route, Routes} from 'react-router-dom';
import {ROUTES} from './routes';
import {VerifyEmailMobile} from '@/pages/onboarding/mobile/verify-email';
import {VerifyPhoneMobile} from '@/pages/onboarding/mobile/verify-phone';

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={ROUTES.referralCreateAccount} replace={true} />}
      />

      {/* onboarding */}
      <Route path={ROUTES.verifyEmailMobile} element={<VerifyEmailMobile />} />
      <Route path={ROUTES.referralCreateAccount} element={<EnterPhone />} />
      <Route path={ROUTES.verifyPhoneMobile} element={<VerifyPhoneMobile />} />
    </Routes>
  );
};

export default AppRouter;
