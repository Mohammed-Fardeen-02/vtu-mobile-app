import { create } from 'zustand';
import {
  PassingPackage,
  PassingQuestion,
  RevisionResource,
  PackageFilterOptions,
} from '../types/passingPackages.types';
import { MOCK_PASSING_PACKAGES } from '../api/mockPassingPackages';
import { useSavedStore } from '@/features/saved/store/useSavedStore';

interface PassingPackageStoreState {
  packages: PassingPackage[];
  activeBranch: string;
  activeSemester: number;
  activeScheme: string;
  filterOptions: PackageFilterOptions;
  bookmarkedQuestionIds: string[];

  // Actions
  setActiveBranch: (branch: string) => void;
  setActiveSemester: (sem: number) => void;
  setActiveScheme: (scheme: string) => void;
  setFilterOptions: (filters: Partial<PackageFilterOptions>) => void;
  resetFilters: () => void;
  toggleQuestionBookmark: (questionId: string) => void;
  
  // Selectors / Helpers
  getPackagesForCurrentStudent: () => PassingPackage[];
  getPackageById: (id: string) => PassingPackage | undefined;
  getQuestionById: (packageId: string, questionId: string) => { pkg: PassingPackage; question: PassingQuestion } | undefined;
  getRevisionResourceById: (packageId: string, resourceId: string) => { pkg: PassingPackage; resource: RevisionResource } | undefined;
}

export const usePassingPackageStore = create<PassingPackageStoreState>((set, get) => ({
  packages: MOCK_PASSING_PACKAGES,
  activeBranch: 'CSE',
  activeSemester: 5,
  activeScheme: '2022',
  filterOptions: {
    selectedUnit: 'All',
    selectedPriority: 'All',
    selectedMarks: 'All',
    searchQuery: '',
  },
  bookmarkedQuestionIds: ['iq-cn-1', 'iq-cn-2', 'rq-cn-1'],

  setActiveBranch: (branch) => set({ activeBranch: branch }),
  setActiveSemester: (sem) => set({ activeSemester: sem }),
  setActiveScheme: (scheme) => set({ activeScheme: scheme }),

  setFilterOptions: (filters) =>
    set((state) => ({
      filterOptions: { ...state.filterOptions, ...filters },
    })),

  resetFilters: () =>
    set({
      filterOptions: {
        selectedUnit: 'All',
        selectedPriority: 'All',
        selectedMarks: 'All',
        searchQuery: '',
      },
    }),

  toggleQuestionBookmark: (questionId) => {
    set((state) => {
      const exists = state.bookmarkedQuestionIds.includes(questionId);
      const updated = exists
        ? state.bookmarkedQuestionIds.filter((id) => id !== questionId)
        : [...state.bookmarkedQuestionIds, questionId];
      return { bookmarkedQuestionIds: updated };
    });
  },

  getPackagesForCurrentStudent: () => {
    const { packages, activeBranch, activeSemester } = get();
    return packages.filter(
      (p) =>
        p.branch.toUpperCase() === activeBranch.toUpperCase() &&
        p.semester === activeSemester
    );
  },

  getPackageById: (id) => {
    const { packages } = get();
    return packages.find((p) => p.id === id);
  },

  getQuestionById: (packageId, questionId) => {
    const pkg = get().getPackageById(packageId);
    if (!pkg) return undefined;
    const allQuestions = [
      ...pkg.importantQuestions,
      ...pkg.repeatedQuestions,
      ...pkg.expectedQuestions,
      ...pkg.nightBeforeSequence,
    ];
    const question = allQuestions.find((q) => q.id === questionId);
    return question ? { pkg, question } : undefined;
  },

  getRevisionResourceById: (packageId, resourceId) => {
    const pkg = get().getPackageById(packageId);
    if (!pkg) return undefined;
    const resource = pkg.revisionResources.find((r) => r.id === resourceId);
    return resource ? { pkg, resource } : undefined;
  },
}));
