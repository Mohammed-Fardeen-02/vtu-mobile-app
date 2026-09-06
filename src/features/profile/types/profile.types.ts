export interface AcademicDetails {
  branch: string; // e.g. "CSE", "ISE", "ECE", "EEE", "ME", "CIV", "AIML"
  semester: number; // 1 - 8
  scheme: string; // "2022", "2021", "2018", "2017"
  cgpa: number; // e.g. 8.74
}

export interface AppPreferences {
  theme: 'light' | 'dark' | 'system';
  pushNotifications: boolean;
  academicAlerts: boolean;
  mobileDataDownloads: boolean;
  accessibilityHighContrast: boolean;
}

export interface BranchOption {
  code: string;
  name: string;
}

export interface SchemeOption {
  code: string;
  yearName: string;
  description: string;
}
