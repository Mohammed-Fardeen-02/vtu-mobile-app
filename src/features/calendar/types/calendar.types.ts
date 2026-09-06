export type EventCategory =
  | 'Exams'
  | 'Internals'
  | 'Lab Exams'
  | 'Holidays'
  | 'Results'
  | 'Semester Dates'
  | 'Other';

export interface AcademicEvent {
  id: string;
  title: string;
  category: EventCategory;
  date: string; // ISO format e.g. "2026-09-15"
  time?: string; // e.g. "09:30 AM - 12:30 PM"
  semester: number; // e.g. 5
  branch?: string; // e.g. "CSE" or "ALL"
  scheme?: string; // e.g. "2022" or "ALL"
  description?: string;
  venue?: string;
  vtuCircularRef?: string;
  isImportant?: boolean;
}

export interface AcademicTimelineStage {
  id: string;
  stageName: string;
  dateRange: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'UPCOMING';
  description: string;
}

export interface FilterState {
  activeCategory: EventCategory | 'All';
  searchQuery: string;
}
