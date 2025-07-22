export interface User {
  id: string;
  name: string;
  email: string;
  role: 'teacher' | 'student';
  avatar?: string;
}
export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  maxPoints: number;
  teacherId: string;
  teacherName: string;
  createdAt: string;
  status: 'draft' | 'published';
  attachments?: FileAttachment[];
}
export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  content: string;
  submittedAt: string;
  grade?: number;
  feedback?: string;
  status: 'submitted' | 'graded' | 'late';
  attachments?: FileAttachment[];
}
export interface FileAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}
export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: 'teacher' | 'student') => Promise<void>;
  logout: () => void;
  loading: boolean;
}