import React, { useState } from 'react';
import { Plus, FileText, Users, Calendar, Eye, BookOpen, Award, Clock } from 'lucide-react';
import { useAssignments } from '../../hooks/useAssignments';
import { AssignmentForm } from './AssignmentForm';
import { SubmissionsModal } from './SubmissionsModal';
export function TeacherDashboard() {
  const { assignments, submissions, loading, createAssignment, gradeSubmission, getAssignmentSubmissions } = useAssignments();
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [selectedAssignmentForSubmissions, setSelectedAssignmentForSubmissions] = useState<string | null>(null);
  const handleCreateAssignment = async (assignmentData: any) => { await createAssignment(assignmentData); setShowAssignmentForm(false);};
  const handleViewSubmissions = (assignmentId: string) => {setSelectedAssignmentForSubmissions(assignmentId);};
  const formatDate = (dateString: string) => {return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric'});};
  const getAssignmentStats = (assignmentId: string) => {
    const assignmentSubmissions = getAssignmentSubmissions(assignmentId);
    const graded = assignmentSubmissions.filter(s => s.status === 'graded').length;
    const pending = assignmentSubmissions.filter(s => s.status === 'submitted').length;
    return { total: assignmentSubmissions.length, graded, pending };
  };
  const totalAssignments = assignments.length;
  const publishedAssignments = assignments.filter(a => a.status === 'published').length;
  const draftAssignments = assignments.filter(a => a.status === 'draft').length;
  const totalSubmissions = submissions.length;
  const gradedSubmissions = submissions.filter(s => s.status === 'graded').length;
  const pendingSubmissions = submissions.filter(s => s.status === 'submitted').length;
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  const selectedAssignment = selectedAssignmentForSubmissions 
    ? assignments.find(a => a.id === selectedAssignmentForSubmissions)
    : null;
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
          <p className="text-gray-600">Manage assignments and track student progress</p>
        </div>
        <button onClick={() => setShowAssignmentForm(true)} className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl">
          <Plus className="h-5 w-5" />
          <span>New Assignment</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Assignments</p>
              <p className="text-2xl font-bold text-gray-900">{totalAssignments}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-gray-900">{publishedAssignments}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">{pendingSubmissions}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Graded</p>
              <p className="text-2xl font-bold text-gray-900">{gradedSubmissions}</p>
            </div>
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
            <p className="text-gray-600 mb-4">Create your first assignment to get started</p>
            <button onClick={() => setShowAssignmentForm(true)} className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              <Plus className="h-4 w-4" />
              <span>Create Assignment</span>
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {assignments.map((assignment) => {
              const stats = getAssignmentStats(assignment.id);
              const dueDate = new Date(assignment.dueDate);
              const isUpcoming = dueDate > new Date();
              return (
                <div key={assignment.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          assignment.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {assignment.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">{assignment.description}</p>
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Due: {formatDate(assignment.dueDate)}</span>
                          {!isUpcoming && (
                            <span className="text-red-600 font-medium">(Past Due)</span>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          <FileText className="h-4 w-4" />
                          <span>{assignment.maxPoints} points</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{stats.total} submissions</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm text-gray-600">
                          <div>Graded: {stats.graded}</div>
                          <div>Pending: {stats.pending}</div>
                        </div>
                      </div>
                      <button onClick={() => handleViewSubmissions(assignment.id)} className="flex items-center space-x-2 px-3 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                        <Eye className="h-4 w-4" />
                        <span>View Submissions</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {showAssignmentForm && (
        <AssignmentForm onSubmit={handleCreateAssignment} onCancel={() => setShowAssignmentForm(false)}/>
      )}
      {selectedAssignmentForSubmissions && selectedAssignment && (
        <SubmissionsModal submissions={getAssignmentSubmissions(selectedAssignmentForSubmissions)} assignmentTitle={selectedAssignment.title} onClose={() => setSelectedAssignmentForSubmissions(null)} onGrade={gradeSubmission}/>
      )}
    </div>
  );
}