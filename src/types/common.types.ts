export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export type SchemeType = '2018' | '2021' | '2022' | '2025';

export interface Subject {
  code: string;
  name: string;
  credits: number;
  semester: number;
  scheme: SchemeType;
  branch: string;
}
