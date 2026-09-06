export type ItemType = 'Note' | 'QuestionPaper';

export type SavedTab = 'All' | 'Downloaded' | 'Bookmarked';

export interface SavedItem {
  id: string;
  title: string;
  subjectCode: string;
  subjectName: string;
  scheme: string;
  branch: string;
  semester: number;
  type: ItemType;
  subType?: string; // e.g. "Module PDF", "Regular", "Makeup", "Model", "Handwritten"
  fileSize: string; // e.g. "2.4 MB"
  fileSizeBytes: number;
  pageCount: number;
  isDownloaded: boolean;
  isBookmarked: boolean;
  downloadedAt?: string;
  bookmarkedAt?: string;
  thumbnailBg?: string;
}

export interface StorageSummary {
  totalUsedBytes: number;
  totalUsedMb: number;
  downloadedCount: number;
  bookmarkedCount: number;
  maxStorageMb: number;
}
