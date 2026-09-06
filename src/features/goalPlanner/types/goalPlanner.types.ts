export type FeasibilityStatus =
  | 'Achievable'
  | 'Challenging'
  | 'Unrealistic'
  | 'Already Achieved';

export interface AcademicData {
  currentCgpa: number;
  completedSemesters: number; // 1 to 7
  currentSemester: number; // 2 to 8
  totalSemesters: number; // 8
}

export interface SemesterTarget {
  semesterNumber: number;
  requiredSgpa: number;
  label: string;
}

export interface ProjectionScenario {
  name: 'Conservative' | 'Expected' | 'Goal Scenario';
  description: string;
  assumedSgpa: number;
  projectedFinalCgpa: number;
  differenceFromTarget: number;
}

export interface GoalResult {
  currentCgpa: number;
  targetCgpa: number;
  completedSemesters: number;
  remainingSemesters: number;
  requiredAverageSgpa: number;
  feasibilityStatus: FeasibilityStatus;
  progressPercentage: number;
  explanation: string;
  semesterTargets: SemesterTarget[];
  scenarios: ProjectionScenario[];
}

export interface SavedGoal {
  id: string;
  title: string;
  targetCgpa: number;
  startingCgpa: number;
  completedSemesters: number;
  requiredSgpa: number;
  feasibilityStatus: FeasibilityStatus;
  createdAt: string;
  isCompleted?: boolean;
}
