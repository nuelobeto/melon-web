export const ROUTES = {
  // customer onboarding
  verifyEmailMobile: '/users/verify-email/:token',
  referralCreateAccount: '/users/create-account/:refCode',
  verifyPhoneMobile: '/users/verify-phone/:phone',
  verifyPhoneMobileFromWidget: '/users/verify-phone/:phone/:otp',
  downloadApp: '/get-the-app',

  // business auth
  createBusinessAccount: '/auth/business/create-account',
  verifyBusinessAccount: '/auth/business/verify-email/:email',
  businessAccountVerified: 'business/email-verified/:token',
  businessSignIn: '/auth/business/sign-in',

  // business onboarding
  businessOnboarding: '/onboarding/business',
  businessPersonalDetails: '/onboarding/business/personal-details',
  businessDetails: '/onboarding/business/details',
  businessDirectorDetails: '/onboarding/business/director-details',
  verifyDirectorPhone: '/onboarding/business/verify-phone/:phone',
  businessOnboardingSuccess: '/onboarding/business/success',

  // dashboard
  home: '/home',
  settings: '/settings',
  businessSettngs: '/settings/business',
  profileSettngs: '/settings/profile',
  guides: '/settings/guides',
  webWidgetIntegration: '/settings/guides/web',
  mobileWidgetIntegration: '/settings/guides/mobile',
  sendCustomerReceipt: '/send-customer-receipt',
};
