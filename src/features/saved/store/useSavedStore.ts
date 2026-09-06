import { create } from 'zustand';
import { SavedItem, SavedTab, StorageSummary } from '../types/saved.types';
import { MOCK_RESOURCES } from '@/features/notes/api/notesData';
import { MOCK_PAPERS } from '@/features/papers/api/mockPapers';

interface SavedStoreState {
  items: SavedItem[];
  activeTab: SavedTab;
  activeCategory: 'All' | 'Notes' | 'Question Papers';
  searchQuery: string;
  isOfflineMode: boolean;

  // Actions
  setActiveTab: (tab: SavedTab) => void;
  setActiveCategory: (category: 'All' | 'Notes' | 'Question Papers') => void;
  setSearchQuery: (query: string) => void;
  toggleOfflineMode: () => void;
  toggleBookmark: (id: string) => void;
  toggleDownload: (id: string) => void;
  removeItem: (id: string) => void;
  clearOfflineStorage: () => void;
  getFilteredItems: () => SavedItem[];
  getStorageSummary: () => StorageSummary;
}

// Convert MOCK_RESOURCES & MOCK_PAPERS into unified SavedItem format
const INITIAL_SAVED_ITEMS: SavedItem[] = [
  ...MOCK_RESOURCES.map((r) => ({
    id: `note-${r.id}`,
    title: r.title,
    subjectCode: r.subjectCode,
    subjectName: r.subjectCode === '21CS52' ? 'Computer Networks' : 'DBMS',
    scheme: '2022',
    branch: 'CSE',
    semester: 5,
    type: 'Note' as const,
    subType: r.type,
    fileSize: r.fileSize,
    fileSizeBytes: parseFloat(r.fileSize) * 1024 * 1024 || 2500000,
    pageCount: r.totalPages || 12,
    isDownloaded: r.isDownloaded,
    isBookmarked: r.isBookmarked,
    downloadedAt: r.isDownloaded ? '2 days ago' : undefined,
    bookmarkedAt: r.isBookmarked ? 'Yesterday' : undefined,
    thumbnailBg: '#EEF2FF',
  })),
  ...MOCK_PAPERS.map((p) => ({
    id: `paper-${p.id}`,
    title: `${p.subjectName} (${p.year} ${p.paperType})`,
    subjectCode: p.subjectCode,
    subjectName: p.subjectName,
    scheme: p.scheme,
    branch: p.branch,
    semester: p.semester,
    type: 'QuestionPaper' as const,
    subType: p.paperType,
    fileSize: p.fileSize,
    fileSizeBytes: parseFloat(p.fileSize) * 1024 * 1024 || 2400000,
    pageCount: p.pageCount,
    isDownloaded: p.id === 'pyq-cn-2024-reg',
    isBookmarked: p.id === 'pyq-cn-2024-reg' || p.id === 'pyq-atc-2023-model',
    downloadedAt: p.id === 'pyq-cn-2024-reg' ? '3 hours ago' : undefined,
    bookmarkedAt: 'Just now',
    thumbnailBg: p.thumbnailBg,
  })),
];

export const useSavedStore = create<SavedStoreState>((set, get) => ({
  items: INITIAL_SAVED_ITEMS,
  activeTab: 'All',
  activeCategory: 'All',
  searchQuery: '',
  isOfflineMode: false,

  setActiveTab: (tab) => set({ activeTab: tab }),

  setActiveCategory: (category) => set({ activeCategory: category }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  toggleOfflineMode: () => set((state) => ({ isOfflineMode: !state.isOfflineMode })),

  toggleBookmark: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item
      ),
    })),

  toggleDownload: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? {
              ...item,
              isDownloaded: !item.isDownloaded,
              downloadedAt: !item.isDownloaded ? 'Just now' : undefined,
            }
          : item
      ),
    })),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, isDownloaded: false, isBookmarked: false } : item
      ),
    })),

  clearOfflineStorage: () =>
    set((state) => ({
      items: state.items.map((item) => ({ ...item, isDownloaded: false })),
    })),

  getFilteredItems: () => {
    const { items, activeTab, activeCategory, searchQuery } = get();

    return items.filter((item) => {
      // Must be either downloaded or bookmarked
      if (!item.isDownloaded && !item.isBookmarked) return false;

      // Active Tab filter
      if (activeTab === 'Downloaded' && !item.isDownloaded) return false;
      if (activeTab === 'Bookmarked' && !item.isBookmarked) return false;

      // Category filter
      if (activeCategory === 'Notes' && item.type !== 'Note') return false;
      if (activeCategory === 'Question Papers' && item.type !== 'QuestionPaper') return false;

      // Search Query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchCode = item.subjectCode.toLowerCase().includes(query);
        const matchName = item.subjectName.toLowerCase().includes(query);
        if (!matchTitle && !matchCode && !matchName) return false;
      }

      return true;
    });
  },

  getStorageSummary: () => {
    const { items } = get();
    const downloadedItems = items.filter((i) => i.isDownloaded);
    const bookmarkedItems = items.filter((i) => i.isBookmarked);

    const totalUsedBytes = downloadedItems.reduce((acc, curr) => acc + curr.fileSizeBytes, 0);
    const totalUsedMb = Math.round((totalUsedBytes / (1024 * 1024)) * 10) / 10;

    return {
      totalUsedBytes,
      totalUsedMb,
      downloadedCount: downloadedItems.length,
      bookmarkedCount: bookmarkedItems.length,
      maxStorageMb: 500, // 500 MB simulated local cache limit
    };
  },
}));
