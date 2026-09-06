export type ResourceType =
  | 'Handwritten Notes'
  | 'Typed PDF'
  | 'Formula Sheet'
  | 'Solved Question Bank'
  | 'Lab Record'
  | 'Revision Mindmap';

export type UploadStatus =
  | 'uploading'
  | 'processing'
  | 'pending_review'
  | 'published'
  | 'rejected'
  | 'failed';

export interface Contributor {
  id: string;
  name: string;
  college: string;
  branch: string;
  semester: number;
  avatarUrl?: string;
  contributionsCount: number;
  totalUpvotes: number;
  reputationBadge: 'VTU Top Contributor' | 'Star Scholar' | 'Verified Peer' | 'Active Student';
}

export interface CommunityResource {
  id: string;
  title: string;
  subjectCode: string;
  subjectName: string;
  branch: string;
  semester: number;
  scheme: string;
  unitNumber?: number;
  resourceType: ResourceType;
  fileSize: string;
  fileFormat: string;
  pageCount: number;
  contributor: Contributor;
  rating: number;
  ratingCount: number;
  usefulCount: number;
  downloadsCount: number;
  viewsCount: number;
  isOfficial: boolean; // false for community resource
  isVerified: boolean; // badge if verified by VTU moderators
  uploadStatus: UploadStatus;
  uploadedAt: string;
  description: string;
  tags: string[];
  previewPages?: string[];
  moderationNote?: string;
  rejectionReason?: string;
  isUsefulVoted?: boolean;
}

export interface CommunityFilterOptions {
  searchQuery: string;
  selectedBranch?: string | 'All';
  selectedSemester?: number | 'All';
  selectedScheme?: string | 'All';
  selectedSubject?: string | 'All';
  selectedUnit?: number | 'All';
  selectedResourceType?: ResourceType | 'All';
  sortBy: 'Most Popular' | 'Highest Rated' | 'Most Useful' | 'Recently Uploaded';
}

export interface UploadFormData {
  fileUri?: string;
  fileName?: string;
  fileSize?: string;
  pageCount?: number;
  title: string;
  subjectCode: string;
  subjectName: string;
  branch: string;
  semester: number;
  scheme: string;
  unitNumber: number;
  resourceType: ResourceType;
  description: string;
  tags: string;
}
