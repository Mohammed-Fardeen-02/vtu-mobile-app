export type AttendanceStatus = 'Safe' | 'Near Target' | 'Low';

export type CalculatorMode = 'REACH_TARGET' | 'CAN_MISS';

export interface SubjectAttendance {
  id: string;
  subjectName: string;
  subjectCode: string;
  attendedClasses: number;
  conductedClasses: number;
  targetAttendance: number; // default e.g. 85
  iconName?: string;
  iconBg?: string;
}

export interface AttendanceHistoryLog {
  id: string;
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  type: 'ATTENDED' | 'MISSED' | 'EDITED' | 'ADDED';
  classesCount: number;
  timestamp: string;
}

export interface CalculationResult {
  currentPercentage: number;
  targetPercentage: number;
  requiredClassesToReachTarget: number;
  missableClassesCount: number;
  projectedPercentage: number;
  explanation: string;
}
