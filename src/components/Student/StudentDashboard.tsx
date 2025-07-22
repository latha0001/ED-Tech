import React, { useState } from 'react';
import { Calendar, FileText, Clock, CheckCircle, AlertTriangle, User, Star, MessageSquare } from 'lucide-react';
import { useAssignments } from '../../hooks/useAssignments';
import { SubmissionForm } from './SubmissionForm';
import { Assignment } from '../../types';
export function StudentDashboard() {
  const { assignments, submissions, loading, submitAssignment, getStudentSubmission } = useAssignments();
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const handleSubmitAssignment = async (content: string, attachments?: File[]) => {if (selectedAssignment) {await submitAssignment(selectedAssignment.id, content, attachments); setSelectedAssignment(null);}};
  const formatDate = (dateString: string) => {return new Date(dateString).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'});};
  const getDaysDiff = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  const getAssignmentStatus = (assignment: Assignment) => {
    const submission = getStudentSubmission(assignment.id);
    const daysDiff = getDaysDiff(assignment.dueDate);
    if (submission) {
      return {status: submission.status, label: submission.status === 'graded' ? 'Graded' : 'Submitted', color: submission.status === 'graded' ? 'text-green-600 bg-green-100' : 'text-blue-600 bg-blue-100', icon: submission.status === 'graded' ? CheckCircle : FileText};
    }
    if (daysDiff < 0) {
      return {status: 'overdue', label: 'Overdue', color: 'text-red-600 bg-red-100', icon: AlertTriangle};
    }
    if (daysDiff <= 2) {
      return {status: 'due-soon', label: 'Due Soon', color: 'text-orange-600 bg-orange-100', icon: Clock};
    }

    return { status: 'pending', label: 'Pending', color: 'text-gray-600 bg-gray-100', icon: FileText};
  };
  const totalAssignments = assignments.length;
  const submittedCount = submissions.length;
  const gradedCount = submissions.filter(s => s.status === 'graded').length;
  const pendingCount = assignments.filter(a => !getStudentSubmission(a.id)).length;
  const overdueCount = assignments.filter(a => {
    const submission = getStudentSubmission(a.id); return !submission && getDaysDiff(a.dueDate) < 0;}).length;
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
        <p className="text-gray-600">Track your assignments and submissions</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{totalAssignments}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{submittedCount}</div>
            <div className="text-sm text-gray-600">Submitted</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{gradedCount}</div>
            <div className="text-sm text-gray-600">Graded</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{overdueCount}</div>
            <div className="text-sm text-gray-600">Overdue</div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Your Assignments</h2>
        </div>
        {assignments.length === 0 ? (
          <div className="p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No assignments yet</h3>
            <p className="text-gray-600">Your teachers haven't posted any assignments yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {assignments.map((assignment) => {
              const statusInfo = getAssignmentStatus(assignment);
              const StatusIcon = statusInfo.icon;
              const submission = getStudentSubmission(assignment.id);
              const daysDiff = getDaysDiff(assignment.dueDate);
              return (
                <div key={assignment.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusInfo.color}`}>
                          <StatusIcon className="inline h-3 w-3 mr-1" />
                          {statusInfo.label}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{assignment.description}</p>
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{assignment.teacherName}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Due: {formatDate(assignment.dueDate)}</span>
                          {daysDiff >= 0 && daysDiff <= 2 && (
                            <span className="text-orange-600 font-medium">({daysDiff === 0 ? 'Today' : `${daysDiff} days left`})</span>
                          )}
                          {daysDiff < 0 && (
                            <span className="text-red-600 font-medium">({Math.abs(daysDiff)} days overdue)</span>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4" />
                          <span>{assignment.maxPoints} points</span>
                        </div>
                      </div>
                      {submission && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-gray-900">Submitted on {new Date(submission.submittedAt).toLocaleDateString()}</p>
                            {submission.grade && (
                              <div className="flex items-center space-x-1 text-green-600">
                                <Star className="h-4 w-4" />
                                <span className="font-medium">{submission.grade}/{assignment.maxPoints}</span>
                              </div>
                            )}
                          </div>
                          {submission.feedback && (
                            <div className="mt-2">
                              <p className="text-sm font-medium text-gray-700 mb-1">
                                <MessageSquare className="inline h-4 w-4 mr-1" />
                                Teacher Feedback:
                              </p>
                              <p className="text-sm text-gray-600 italic">{submission.feedback}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="ml-6">
                      {!submission && (
                        <button onClick={() => setSelectedAssignment(assignment)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors" disabled={daysDiff < -7}>Submit</button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {selectedAssignment && (
        <SubmissionForm assignment={selectedAssignment} onSubmit={handleSubmitAssignment} onCancel={() => setSelectedAssignment(null)}/>
      )}
    </div>
  );
}