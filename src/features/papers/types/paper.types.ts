export type PaperType = 'Regular' | 'Makeup' | 'Model' | 'SEE_THEORY' | 'IA_1' | 'IA_2' | 'IA_3';

export type PaperContentType = 'DIGITAL_TYPED' | 'PDF_UPLOAD' | 'HYBRID';

export interface QuestionSubItem {
  subCode: string; // 'a', 'b', 'c'
  text: string;
  marks: number;
  bloomLevel?: string; // L1, L2, L3, L4
  solution?: string;
}

export interface QuestionChoice {
  choiceId: string; // 'Q1a', 'Q1b'
  isOrOption?: boolean;
  subQuestions: QuestionSubItem[];
}

export interface QuestionModule {
  moduleNumber: number;
  title: string;
  mainQuestions?: {
    questionNumber: string;
    choices: QuestionChoice[];
  }[];
  // Fallback simple list
  questions?: {
    questionNumber: string;
    questionText: string;
    marks: number;
    bloomLevel?: string;
    solution?: string;
  }[];
}

export interface QuestionPaper {
  id: string;
  title?: string;
  subjectName: string;
  subjectCode: string;
  scheme: string; // "2022", "2021", "2018"
  branch: string; // "CSE", "ISE", "ECE"
  semester: number; // 1 - 8
  paperType: PaperType;
  contentType?: PaperContentType;
  year: string; // "2025", "2024"
  month: string; // "Jan/Feb", "Jul/Aug"
  maxMarks?: number; // 100
  durationHours?: number; // 3.0
  fileSize: string;
  pageCount: number;
  viewsCount: number;
  downloadsCount: number;
  pdfUrl?: string;
  solutionPdfUrl?: string;
  hasSolutionKey?: boolean;
  thumbnailBg?: string;
  modules: QuestionModule[];
}

export interface PaperFilterState {
  scheme: string;
  branch: string;
  semester: string;
  subject: string;
  year: string;
  paperType: string;
  contentType?: string;
  searchQuery: string;
}

export interface DownloadProgress {
  paperId: string;
  progress: number;
  downloadedBytes: number;
  totalBytes: number;
  isCompleted: boolean;
  isError: boolean;
}
