import {useEffect} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import {ROUTES} from '@/router/routes';
import {useAuth} from '@/store/useAuth';

const ProtectedRoutes = () => {
  const {user} = useAuth();
  const savedToken: string | null = localStorage.getItem('token');
  const token: string | null = savedToken ? JSON.parse(savedToken) : null;

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !user) {
      navigate(ROUTES.businessSignIn);
    }
  }, [token, navigate, user]);

  return <Outlet />;
};

export default ProtectedRoutes;
