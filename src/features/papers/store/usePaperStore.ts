import { create } from 'zustand';
import { QuestionPaper, PaperFilterState, DownloadProgress } from '../types/paper.types';
import { MOCK_PAPERS } from '../api/mockPapers';

interface PaperStoreState {
  papers: QuestionPaper[];
  bookmarkedIds: string[];
  downloadedIds: string[];
  downloadProgressMap: Record<string, DownloadProgress>;
  activeFilters: PaperFilterState;
  activeTab: 'All' | 'Downloaded' | 'Bookmarked';
  
  // Actions
  setFilters: (filters: Partial<PaperFilterState>) => void;
  resetFilters: (userProfileDefaults?: { branch?: string; semester?: number; scheme?: string }) => void;
  toggleBookmark: (paperId: string) => void;
  startDownload: (paperId: string) => void;
  removeDownload: (paperId: string) => void;
  setActiveTab: (tab: 'All' | 'Downloaded' | 'Bookmarked') => void;
  incrementViewCount: (paperId: string) => void;
  initFiltersFromProfile: (profile: { branch?: string; semester?: number; scheme?: string }) => void;
  getFilteredPapers: () => QuestionPaper[];
}

const DEFAULT_FILTERS: PaperFilterState = {
  scheme: 'All',
  branch: 'All',
  semester: 'All',
  subject: 'All',
  year: 'All',
  paperType: 'All',
  searchQuery: '',
};

export const usePaperStore = create<PaperStoreState>((set, get) => ({
  papers: MOCK_PAPERS,
  bookmarkedIds: ['pyq-cn-2024-reg', 'pyq-atc-2023-model'],
  downloadedIds: ['pyq-cn-2024-reg'],
  downloadProgressMap: {},
  activeFilters: DEFAULT_FILTERS,
  activeTab: 'All',

  setFilters: (newFilters) =>
    set((state) => ({
      activeFilters: { ...state.activeFilters, ...newFilters },
    })),

  resetFilters: (userProfileDefaults) =>
    set(() => ({
      activeFilters: {
        ...DEFAULT_FILTERS,
        branch: userProfileDefaults?.branch || 'All',
        semester: userProfileDefaults?.semester ? String(userProfileDefaults.semester) : 'All',
        scheme: userProfileDefaults?.scheme || 'All',
      },
    })),

  initFiltersFromProfile: (profile) => {
    const current = get().activeFilters;
    // Only pre-fill if initial untouched state
    if (current.branch === 'All' && current.semester === 'All' && current.scheme === 'All') {
      set({
        activeFilters: {
          ...current,
          branch: profile.branch || 'CSE',
          semester: profile.semester ? String(profile.semester) : '5',
          scheme: profile.scheme || '2022',
        },
      });
    }
  },

  toggleBookmark: (paperId) =>
    set((state) => {
      const exists = state.bookmarkedIds.includes(paperId);
      const updated = exists
        ? state.bookmarkedIds.filter((id) => id !== paperId)
        : [...state.bookmarkedIds, paperId];
      return { bookmarkedIds: updated };
    }),

  startDownload: (paperId) => {
    const state = get();
    if (state.downloadedIds.includes(paperId)) return;

    // Initialize download progress
    set((s) => ({
      downloadProgressMap: {
        ...s.downloadProgressMap,
        [paperId]: {
          paperId,
          progress: 10,
          downloadedBytes: 250000,
          totalBytes: 2500000,
          isCompleted: false,
          isError: false,
        },
      },
    }));

    // Simulate progressive download
    let currentProgress = 10;
    const interval = setInterval(() => {
      currentProgress += 22;
      if (currentProgress >= 100) {
        clearInterval(interval);
        set((s) => ({
          downloadedIds: [...new Set([...s.downloadedIds, paperId])],
          downloadProgressMap: {
            ...s.downloadProgressMap,
            [paperId]: {
              paperId,
              progress: 100,
              downloadedBytes: 2500000,
              totalBytes: 2500000,
              isCompleted: true,
              isError: false,
            },
          },
        }));
      } else {
        set((s) => ({
          downloadProgressMap: {
            ...s.downloadProgressMap,
            [paperId]: {
              paperId,
              progress: currentProgress,
              downloadedBytes: Math.round((currentProgress / 100) * 2500000),
              totalBytes: 2500000,
              isCompleted: false,
              isError: false,
            },
          },
        }));
      }
    }, 400);
  },

  removeDownload: (paperId) =>
    set((state) => {
      const newMap = { ...state.downloadProgressMap };
      delete newMap[paperId];
      return {
        downloadedIds: state.downloadedIds.filter((id) => id !== paperId),
        downloadProgressMap: newMap,
      };
    }),

  setActiveTab: (tab) => set({ activeTab: tab }),

  incrementViewCount: (paperId) =>
    set((state) => ({
      papers: state.papers.map((p) =>
        p.id === paperId ? { ...p, viewsCount: p.viewsCount + 1 } : p
      ),
    })),

  getFilteredPapers: () => {
    const { papers, activeFilters, bookmarkedIds, downloadedIds, activeTab } = get();

    return papers.filter((paper) => {
      // Tab filter
      if (activeTab === 'Downloaded' && !downloadedIds.includes(paper.id)) return false;
      if (activeTab === 'Bookmarked' && !bookmarkedIds.includes(paper.id)) return false;

      // Scheme
      if (activeFilters.scheme !== 'All' && paper.scheme !== activeFilters.scheme) return false;

      // Branch
      if (activeFilters.branch !== 'All' && paper.branch !== activeFilters.branch) return false;

      // Semester
      if (
        activeFilters.semester !== 'All' &&
        String(paper.semester) !== String(activeFilters.semester)
      ) {
        return false;
      }

      // Year
      if (activeFilters.year !== 'All' && paper.year !== activeFilters.year) return false;

      // Paper Type
      if (
        activeFilters.paperType !== 'All' &&
        paper.paperType.toLowerCase() !== activeFilters.paperType.toLowerCase()
      ) {
        return false;
      }

      // Search Query
      if (activeFilters.searchQuery.trim() !== '') {
        const query = activeFilters.searchQuery.toLowerCase();
        const matchName = paper.subjectName.toLowerCase().includes(query);
        const matchCode = paper.subjectCode.toLowerCase().includes(query);
        const matchBranch = paper.branch.toLowerCase().includes(query);
        const matchYear = paper.year.toLowerCase().includes(query);
        if (!matchName && !matchCode && !matchBranch && !matchYear) return false;
      }

      return true;
    });
  },
}));
