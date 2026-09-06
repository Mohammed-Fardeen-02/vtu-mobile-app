import { create } from 'zustand';
import {
  CommunityResource,
  CommunityFilterOptions,
  UploadFormData,
  UploadStatus,
  Contributor,
} from '../types/community.types';
import { MOCK_COMMUNITY_RESOURCES, MOCK_CONTRIBUTORS } from '../api/mockCommunityData';

interface CommunityState {
  resources: CommunityResource[];
  myUploads: CommunityResource[];
  contributors: Contributor[];
  filterOptions: CommunityFilterOptions;
  uploadDraft: UploadFormData;
  uploadStatus: UploadStatus;
  uploadProgressPercent: number;

  // Actions
  setFilterOptions: (filters: Partial<CommunityFilterOptions>) => void;
  resetFilters: () => void;
  toggleUsefulVote: (resourceId: string) => void;
  submitRating: (resourceId: string, ratingValue: number) => void;
  
  // Upload Flow Actions
  setUploadDraft: (draft: Partial<UploadFormData>) => void;
  resetUploadDraft: () => void;
  startUploadProcess: (onComplete?: (newId: string) => void) => void;
  
  // Selectors / Helpers
  getFilteredResources: () => CommunityResource[];
  getResourceById: (id: string) => CommunityResource | undefined;
  getContributorById: (id: string) => Contributor | undefined;
  getTrendingResources: () => CommunityResource[];
  getFeaturedResources: () => CommunityResource[];
}

const INITIAL_DRAFT: UploadFormData = {
  title: '',
  subjectCode: '21CS52',
  subjectName: 'Computer Networks & Security',
  branch: 'CSE',
  semester: 5,
  scheme: '2022',
  unitNumber: 1,
  resourceType: 'Handwritten Notes',
  description: '',
  tags: 'VTU, Handwritten, Notes',
};

export const useCommunityStore = create<CommunityState>((set, get) => ({
  resources: MOCK_COMMUNITY_RESOURCES,
  myUploads: [MOCK_COMMUNITY_RESOURCES[3]], // Fardeen Khan's upload
  contributors: MOCK_CONTRIBUTORS,
  filterOptions: {
    searchQuery: '',
    selectedBranch: 'All',
    selectedSemester: 'All',
    selectedScheme: 'All',
    selectedSubject: 'All',
    selectedUnit: 'All',
    selectedResourceType: 'All',
    sortBy: 'Most Popular',
  },
  uploadDraft: INITIAL_DRAFT,
  uploadStatus: 'uploading',
  uploadProgressPercent: 0,

  setFilterOptions: (filters) =>
    set((state) => ({
      filterOptions: { ...state.filterOptions, ...filters },
    })),

  resetFilters: () =>
    set({
      filterOptions: {
        searchQuery: '',
        selectedBranch: 'All',
        selectedSemester: 'All',
        selectedScheme: 'All',
        selectedSubject: 'All',
        selectedUnit: 'All',
        selectedResourceType: 'All',
        sortBy: 'Most Popular',
      },
    }),

  toggleUsefulVote: (resourceId) => {
    set((state) => ({
      resources: state.resources.map((res) => {
        if (res.id === resourceId) {
          const isVoted = res.isUsefulVoted;
          return {
            ...res,
            isUsefulVoted: !isVoted,
            usefulCount: isVoted ? res.usefulCount - 1 : res.usefulCount + 1,
          };
        }
        return res;
      }),
    }));
  },

  submitRating: (resourceId, ratingValue) => {
    set((state) => ({
      resources: state.resources.map((res) => {
        if (res.id === resourceId) {
          const newCount = res.ratingCount + 1;
          const newAvg = Math.round(((res.rating * res.ratingCount + ratingValue) / newCount) * 10) / 10;
          return {
            ...res,
            rating: newAvg,
            ratingCount: newCount,
          };
        }
        return res;
      }),
    }));
  },

  setUploadDraft: (draft) =>
    set((state) => ({
      uploadDraft: { ...state.uploadDraft, ...draft },
    })),

  resetUploadDraft: () => set({ uploadDraft: INITIAL_DRAFT }),

  startUploadProcess: (onComplete) => {
    set({ uploadStatus: 'uploading', uploadProgressPercent: 15 });

    // Step 1: Uploading
    setTimeout(() => {
      set({ uploadProgressPercent: 65 });
    }, 600);

    // Step 2: Processing & Malware Verification
    setTimeout(() => {
      set({ uploadStatus: 'processing', uploadProgressPercent: 100 });
    }, 1200);

    // Step 3: Pending Review & Publish
    setTimeout(() => {
      const draft = get().uploadDraft;
      const newId = `cr-user-${Date.now()}`;
      const newResource: CommunityResource = {
        id: newId,
        title: draft.title || 'Untitled Community Note',
        subjectCode: draft.subjectCode,
        subjectName: draft.subjectName,
        branch: draft.branch,
        semester: draft.semester,
        scheme: draft.scheme,
        unitNumber: draft.unitNumber,
        resourceType: draft.resourceType,
        fileSize: draft.fileSize || '3.5 MB',
        fileFormat: 'PDF',
        pageCount: draft.pageCount || 18,
        contributor: MOCK_CONTRIBUTORS[3], // Current logged in user
        rating: 5.0,
        ratingCount: 1,
        usefulCount: 1,
        downloadsCount: 0,
        viewsCount: 1,
        isOfficial: false,
        isVerified: true,
        uploadStatus: 'published',
        uploadedAt: 'Just now',
        description: draft.description || 'Uploaded via VTU Notes Community',
        tags: draft.tags.split(',').map((t) => t.trim()),
      };

      set((state) => ({
        uploadStatus: 'published',
        resources: [newResource, ...state.resources],
        myUploads: [newResource, ...state.myUploads],
      }));

      if (onComplete) onComplete(newId);
    }, 2000);
  },

  getFilteredResources: () => {
    const { resources, filterOptions } = get();
    const {
      searchQuery,
      selectedBranch,
      selectedSemester,
      selectedScheme,
      selectedSubject,
      selectedUnit,
      selectedResourceType,
      sortBy,
    } = filterOptions;

    let list = resources.filter((res) => {
      if (selectedBranch !== 'All' && res.branch !== selectedBranch) return false;
      if (selectedSemester !== 'All' && res.semester !== selectedSemester) return false;
      if (selectedScheme !== 'All' && res.scheme !== selectedScheme) return false;
      if (selectedSubject !== 'All' && res.subjectCode !== selectedSubject) return false;
      if (selectedUnit !== 'All' && res.unitNumber !== selectedUnit) return false;
      if (selectedResourceType !== 'All' && res.resourceType !== selectedResourceType) return false;

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = res.title.toLowerCase().includes(q);
        const matchCode = res.subjectCode.toLowerCase().includes(q);
        const matchSubject = res.subjectName.toLowerCase().includes(q);
        const matchContributor = res.contributor.name.toLowerCase().includes(q);
        if (!matchTitle && !matchCode && !matchSubject && !matchContributor) return false;
      }

      return true;
    });

    if (sortBy === 'Highest Rated') {
      list = list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'Most Useful') {
      list = list.sort((a, b) => b.usefulCount - a.usefulCount);
    } else if (sortBy === 'Recently Uploaded') {
      list = list.sort((a, b) => b.id.localeCompare(a.id));
    } else {
      // Most Popular
      list = list.sort((a, b) => b.downloadsCount - a.downloadsCount);
    }

    return list;
  },

  getResourceById: (id) => get().resources.find((r) => r.id === id),

  getContributorById: (id) => get().contributors.find((c) => c.id === id),

  getTrendingResources: () =>
    [...get().resources].sort((a, b) => b.usefulCount - a.usefulCount).slice(0, 4),

  getFeaturedResources: () =>
    [...get().resources].sort((a, b) => b.rating - a.rating).slice(0, 3),
}));
