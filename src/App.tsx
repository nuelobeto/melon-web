import {BrowserRouter} from 'react-router-dom';
import AppRouter from './router/app-router';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useEffect} from 'react';
import {getFCMToken, onForegroundMessage} from './config/firebase';

const App = () => {
  useEffect(() => {
    // Request permission for notifications
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          // Fetch FCM token once permission is granted
          getFCMToken();
        }
      });
    } else {
      getFCMToken(); // If permission is already granted
    }

    // Handle foreground messages (when the app is open)
    onForegroundMessage();
  }, []);

  return (
    <BrowserRouter>
      <AppRouter />
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
