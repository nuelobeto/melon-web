import {initializeApp} from 'firebase/app';
import {getMessaging, getToken, onMessage} from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyDCu-peznCi9HFPDxbtrou1QAnqABf1fII',
  authDomain: 'melon-app-9a5fc.firebaseapp.com',
  projectId: 'melon-app-9a5fc',
  storageBucket: 'melon-app-9a5fc.firebasestorage.app',
  messagingSenderId: '504518018966',
  appId: '1:504518018966:web:9c08bd6cfb26f4d6a8ffb7',
  measurementId: 'G-B0MN3LQ3XY',
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Get the FCM token
export const getFCMToken = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey:
        'BJobOFxJz02ddwaEjpTJNsrXru9T2DaObem6a_N3FrG8tjAq2f_bsEoLWMKUaW4aEtn6dX6QGDFrk3Hoo2tJ8-U', // Your public VAPID key from Firebase console
    });

    if (token) {
      console.log('FCM Token received', token);
      return token;
    } else {
      console.log('No FCM token available');
    }
  } catch (error) {
    console.error('Error getting FCM token:', error);
  }
};

// Handle foreground messages
export const onForegroundMessage = () => {
  onMessage(messaging, payload => {
    console.log('Foreground message received:', payload);
  });
};
