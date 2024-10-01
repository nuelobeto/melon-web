import {EnterPhone} from '@/pages/onboarding/mobile/enter-phone';
import {Navigate, Route, Routes} from 'react-router-dom';
import {ROUTES} from './routes';
import {VerifyEmailMobile} from '@/pages/onboarding/mobile/verify-email';
import {VerifyPhoneMobile} from '@/pages/onboarding/mobile/verify-phone';
import {DowloadApp} from '@/pages/onboarding/mobile/dowload-app';
import {WidgetTest} from '@/pages/widget-test';

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
      <Route path={ROUTES.downloadApp} element={<DowloadApp />} />
      <Route path={'/widget'} element={<WidgetTest />} />
    </Routes>
  );
};

export default AppRouter;
