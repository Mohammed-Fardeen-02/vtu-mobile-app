import { create } from 'zustand';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  usn?: string;
  college?: string;
  collegeCity?: string;
  avatarUrl?: string;
  branch?: string;
  semester?: number;
  scheme?: string;
  currentCgpa?: number;
  targetCgpa?: number;
  totalCredits?: number;
  earnedCredits?: number;
  notificationsEnabled?: boolean;
}

const DEFAULT_USER: UserProfile = {
  id: 'u-101',
  name: 'Fardeen Khan',
  email: 'fardeen.k@vtu.ac.in',
  usn: '1VA21CS042',
  college: 'Sai Vidya Institute of Technology',
  collegeCity: 'Bengaluru',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  branch: 'CSE',
  semester: 5,
  scheme: '2022',
  currentCgpa: 8.74,
  targetCgpa: 9.20,
  earnedCredits: 112,
  totalCredits: 160,
  notificationsEnabled: true,
};

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  token: string | null;
  setAuth: (user: UserProfile, token: string) => void;
  updateProfile: (updatedFields: Partial<UserProfile>) => void;
  setOnboarded: (status: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: DEFAULT_USER,
  isAuthenticated: true,
  isOnboarded: true,
  token: 'mock-jwt-token-12345',

  setAuth: (user, token) => set({ user, token, isAuthenticated: true }),

  updateProfile: (updatedFields) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updatedFields } : { ...DEFAULT_USER, ...updatedFields },
    })),

  setOnboarded: (isOnboarded) => set({ isOnboarded }),

  logout: () => set({ user: null, token: null, isAuthenticated: false }),
}));
