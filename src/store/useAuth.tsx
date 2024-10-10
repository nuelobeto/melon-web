import {UserT} from '@/types';
import {create} from 'zustand';

interface AuthState {
  user: UserT | null;
  setUser: (user: UserT | null) => void;
  logout: () => void;
}

const savedUser: string | null = localStorage.getItem('user');
const user: UserT | null = savedUser ? JSON.parse(savedUser) : null;

export const useAuth = create<AuthState>(set => ({
  user,
  setUser(user) {
    set({user});
  },
  logout() {
    set({user: null});
    localStorage.clear();
  },
}));
