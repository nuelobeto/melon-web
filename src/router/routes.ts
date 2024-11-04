export const ROUTES = {
  // customer onboarding
  verifyEmailMobile: '/users/verify-email/:token',
  referralCreateAccount: '/users/create-account/:refCode',
  verifyPhoneMobile: '/users/verify-phone/:phone',
  verifyPhoneMobileFromWidget: '/users/verify-phone/:phone/:otp',
  downloadApp: '/get-the-app',

  // business auth
  createAccount: '/auth/create-account',
  verifyEmail: '/auth/verify-email/:email',
  accountVerified: '/business/email-verified/:token',
  login: '/auth/login',
  forgotBusinessPassword: '/auth/forgot-password',
  forgotPasswordSuccess: '/auth/forgot-password/:email',
  resetPassword: '/business/forget-password/:token',

  // registration
  registeredBusinessRegistration: '/onboarding/resgistered-business',
  verifyDirectorPhone: '/onboarding/business/verify-phone/:phone',
  unRegisteredBusinessRegistration: '/onboarding/unresgistered-business',
  verifyOwnerPhone: '/onboarding/business/owner/verify-phone/:phone',
  registrationSuccess: '/onboarding/success',

  // dashboard
  getStarted: '/get-started',
  docs: '/documentation',
  webDocs: '/documentation/web',
  mobileDocs: '/documentation/mobile',
  home: '/home',
  transactions: '/transactions',
  sendReward: '/send-reward',
  customerReward: '/send-reward/customer/:api_key/:store_name',
  settings: '/settings',
  businessSettngs: '/settings/business',
  profileSettngs: '/settings/profile',
  guides: '/settings/guides',
  webWidgetIntegration: '/settings/guides/web',
  mobileWidgetIntegration: '/settings/guides/mobile',
  sendCustomerReceipt: '/send-customer-receipt',
};
