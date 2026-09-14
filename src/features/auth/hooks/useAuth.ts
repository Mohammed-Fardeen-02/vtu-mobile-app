import { useAuthStore } from '../../../store/useAuthStore';
import { UserProfile, LoginPayload, RegisterPayload } from '../types/type';

export const useAuth = () => {
  const store = useAuthStore();

  return {
    user: store.user as UserProfile | null,
    isAuthenticated: store.isAuthenticated,
    isOnboarded: store.isOnboarded,
    token: store.token,
    isLoading: store.isLoading,
    error: store.error,
    login: (email: string, password?: string) => store.login(email, password || ''),
    register: (payload: RegisterPayload) => store.register(payload),
    loginWithGoogle: (idToken: string) => store.loginWithGoogle(idToken),
    initAuth: () => store.initAuth(),
    logout: () => store.logout(),
    clearError: () => store.clearError(),
    updateProfile: (fields: Partial<UserProfile>) => store.updateProfile(fields),
    setAuth: (user: UserProfile, token: string) => store.setAuth(user, token),
  };
};
