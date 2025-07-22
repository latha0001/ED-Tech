import { useState, useEffect } from 'react';
import { Assignment, Submission } from '../types';
import { useAuth } from '../contexts/AuthContext';
let mockAssignments: Assignment[] = [
  {
    id: '1',
    title: 'React Fundamentals Project',
    description: 'Build a complete React application demonstrating component lifecycle, state management, and API integration. Include at least 5 components with proper prop handling.',
    dueDate: '2025-01-20',
    maxPoints: 100,
    teacherId: '1',
    teacherName: 'latha kadavath',
    createdAt: '2025-01-10',
    status: 'published'
  },
  {
    id: '2',
    title: 'Database Design Exercise',
    description: 'Design and implement a normalized database schema for an e-commerce platform. Include ER diagrams and SQL scripts.',
    dueDate: '2025-01-25',
    maxPoints: 85,
    teacherId: '2',
    teacherName: 'bhanu',
    createdAt: '2025-01-12',
    status: 'published'
  },
  {
    id: '3',
    title: 'Algorithm Analysis Report',
    description: 'Compare and analyze the time complexity of different sorting algorithms. Provide empirical evidence with performance tests.',
    dueDate: '2025-01-30',
    maxPoints: 90,
    teacherId: '1',
    teacherName: 'latha kadavath',
    createdAt: '2025-01-14',
    status: 'published'
  }
];

let mockSubmissions: Submission[] = [
  {
    id: '1',
    assignmentId: '1',
    studentId: '3',
    studentName: 'kiran',
    content: 'I have completed the React Fundamentals project with all required components. The application includes user authentication, data fetching, and responsive design.',
    submittedAt: '2025-01-18T10:30:00Z',
    status: 'submitted'
  },
  {
    id: '2',
    assignmentId: '1',
    studentId: '4',
    studentName: 'Madno',
    content: 'My React project demonstrates advanced state management using Context API and includes comprehensive error handling.',
    submittedAt: '2025-01-19T14:20:00Z',
    grade: 95,
    feedback: 'Excellent work! Great use of React patterns and clean code structure.',
    status: 'graded'
  },
  {
    id: '3',
    assignmentId: '2',
    studentId: '3',
    studentName: 'kiran',
    content: 'Database schema design completed with proper normalization and includes all required SQL scripts and documentation.',
    submittedAt: '2025-01-23T09:15:00Z',
    status: 'submitted'
  }
];
export function useAssignments() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (user?.role === 'teacher') {
        setAssignments(mockAssignments.filter(a => a.teacherId === user.id));
        setSubmissions(mockSubmissions.filter(s => 
          mockAssignments.find(a => a.id === s.assignmentId && a.teacherId === user.id)
        ));
      } else if (user?.role === 'student') {
        setAssignments(mockAssignments.filter(a => a.status === 'published'));
        setSubmissions(mockSubmissions.filter(s => s.studentId === user.id));
      }
      setLoading(false);
    };
    if (user) {
      loadData();
    }
  }, [user]);
  const createAssignment = async (assignment: Omit<Assignment, 'id' | 'teacherId' | 'teacherName' | 'createdAt'>) => {
    if (!user || user.role !== 'teacher') return;
    const newAssignment: Assignment = {
      ...assignment,
      id: Date.now().toString(),
      teacherId: user.id,
      teacherName: user.name,
      createdAt: new Date().toISOString().split('T')[0]
    };
    mockAssignments.push(newAssignment);
    setAssignments(prev => [...prev, newAssignment]);
  };
  const submitAssignment = async (assignmentId: string, content: string, attachments?: File[]) => {
    if (!user || user.role !== 'student') return;
    const submission: Submission = {
      id: Date.now().toString(),
      assignmentId,
      studentId: user.id,
      studentName: user.name,
      content,
      submittedAt: new Date().toISOString(),
      status: 'submitted',
      attachments: attachments?.map(file => ({
        id: Date.now().toString(),
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file)
      }))
    };
    mockSubmissions.push(submission);
    setSubmissions(prev => [...prev, submission]);
  };
  const gradeSubmission = async (submissionId: string, grade: number, feedback: string) => {
    if (!user || user.role !== 'teacher') return;
    const submissionIndex = mockSubmissions.findIndex(s => s.id === submissionId);
    if (submissionIndex !== -1) {
      mockSubmissions[submissionIndex] = {
        ...mockSubmissions[submissionIndex],
        grade,
        feedback,
        status: 'graded'
      };
      setSubmissions(prev => prev.map(s => 
        s.id === submissionId 
          ? { ...s, grade, feedback, status: 'graded' }
          : s
      ));
    }
  };
  const getAssignmentSubmissions = (assignmentId: string) => {
    return submissions.filter(s => s.assignmentId === assignmentId);
  };
  const getStudentSubmission = (assignmentId: string) => {
    return submissions.find(s => s.assignmentId === assignmentId && s.studentId === user?.id);
  };
  return {assignments, submissions, loading, createAssignment, submitAssignment, gradeSubmission, getAssignmentSubmissions, getStudentSubmission};
}