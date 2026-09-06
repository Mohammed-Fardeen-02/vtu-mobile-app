export type PaperType = 'Regular' | 'Makeup' | 'Model';

export interface QuestionModule {
  moduleNumber: number;
  title: string;
  questions: {
    questionNumber: string; // e.g. "Q1 (a)", "Q1 (b)" or "Q2 (a)"
    questionText: string;
    marks: number;
    bloomLevel?: string; // L1, L2, L3
  }[];
}

export interface QuestionPaper {
  id: string;
  subjectName: string;
  subjectCode: string;
  scheme: string; // "2022", "2021", "2018", etc.
  branch: string; // "CSE", "ISE", "ECE", "EEE", "ME", "CIV"
  semester: number; // 1 - 8
  paperType: PaperType;
  year: string; // "2024", "2023", "2022"
  month: string; // "Jan/Feb", "Jul/Aug", "Dec/Jan"
  fileSize: string; // "2.4 MB"
  pageCount: number; // e.g. 4
  viewsCount: number;
  downloadsCount: number;
  pdfUrl?: string;
  thumbnailBg?: string;
  modules: QuestionModule[];
}

export interface PaperFilterState {
  scheme: string; // 'All' | '2022' | '2021' | '2018'
  branch: string; // 'All' | 'CSE' | 'ISE' | 'ECE' | etc.
  semester: string; // 'All' | '1' | '2' | ... | '8'
  subject: string; // 'All' | specific subject code/name
  year: string; // 'All' | '2024' | '2023' | ...
  paperType: string; // 'All' | 'Regular' | 'Makeup' | 'Model'
  searchQuery: string;
}

export interface DownloadProgress {
  paperId: string;
  progress: number; // 0 to 100
  downloadedBytes: number;
  totalBytes: number;
  isCompleted: boolean;
  isError: boolean;
}
