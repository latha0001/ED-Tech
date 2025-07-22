import React, { useState } from 'react';
import { X, User, Calendar, FileText, Star, MessageSquare, Save } from 'lucide-react';
import { Submission } from '../../types';
interface SubmissionsModalProps {submissions: Submission[]; assignmentTitle: string; onClose: () => void; onGrade: (submissionId: string, grade: number, feedback: string) => void;}
export function SubmissionsModal({ submissions, assignmentTitle, onClose, onGrade }: SubmissionsModalProps) {
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(submissions[0] || null);
  const [grading, setGrading] = useState({ grade: '', feedback: '' });
  const handleGradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSubmission && grading.grade) {
      onGrade(selectedSubmission.id, parseInt(grading.grade), grading.feedback);
      setGrading({ grade: '', feedback: '' });
      setSelectedSubmission(prev => prev ? { ...prev, grade: parseInt(grading.grade), feedback: grading.feedback, status: 'graded'} : null);
    }
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-yellow-100 text-yellow-800';
      case 'graded':
        return 'bg-green-100 text-green-800';
      case 'late':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const formatDate = (dateString: string) => {return new Date(dateString).toLocaleString();};
  if (submissions.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Submissions</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No submissions yet for this assignment.</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Submissions</h2>
            <p className="text-sm text-gray-600">{assignmentTitle}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <div className="flex h-[calc(90vh-80px)]">
          <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-3">
                Students ({submissions.length})
              </h3>
              <div className="space-y-2">
                {submissions.map((submission) => (
                  <button
                    key={submission.id}
                    onClick={() => {setSelectedSubmission(submission); setGrading({  grade: submission.grade?.toString() || '',  feedback: submission.feedback || '' });}}
                    className={`w-full p-3 rounded-lg border text-left transition-colors ${
                      selectedSubmission?.id === submission.id
                        ? 'border-indigo-200 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="font-medium text-sm">{submission.studentName}</span>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(submission.status)}`}>
                        {submission.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(submission.submittedAt)}
                    </div>
                    {submission.grade && (
                      <div className="mt-2 flex items-center text-xs text-green-600">
                        <Star className="h-3 w-3 mr-1" />
                        {submission.grade} points
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            {selectedSubmission && (
              <>
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {selectedSubmission.studentName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Submitted on {formatDate(selectedSubmission.submittedAt)}
                      </p>
                    </div>
                    <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(selectedSubmission.status)}`}>
                      {selectedSubmission.status}
                    </span>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Submission Content</h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-700 whitespace-pre-wrap">
                          {selectedSubmission.content}
                        </p>
                      </div>
                    </div>
                    {selectedSubmission.attachments && selectedSubmission.attachments.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Attachments</h4>
                        <div className="space-y-2">
                          {selectedSubmission.attachments.map((attachment) => (
                            <div key={attachment.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                              <FileText className="h-5 w-5 text-gray-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                                <p className="text-xs text-gray-500">
                                  {(attachment.size / 1024).toFixed(1)} KB
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                        <Star className="h-5 w-5 mr-2" />
                        Grade Submission
                      </h4>
                      {selectedSubmission.status === 'graded' && !grading.grade ? (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-green-800">Grade: {selectedSubmission.grade} points</span>
                            <button
                              onClick={() => setGrading({ 
                                grade: selectedSubmission.grade?.toString() || '', 
                                feedback: selectedSubmission.feedback || '' 
                              })} className="text-sm text-indigo-600 hover:text-indigo-500">
                              Edit Grade
                            </button>
                          </div>
                          {selectedSubmission.feedback && (
                            <div>
                              <p className="text-sm font-medium text-green-800 mb-1">Feedback:</p>
                              <p className="text-sm text-green-700">{selectedSubmission.feedback}</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <form onSubmit={handleGradeSubmit} className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Grade (points)
                            </label>
                            <input type="number" min="0" max="100" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" value={grading.grade} onChange={(e) => setGrading(prev => ({ ...prev, grade: e.target.value }))}/>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              <MessageSquare className="inline h-4 w-4 mr-1" />
                              Feedback (optional)
                            </label>
                            <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Provide feedback to the student..." value={grading.feedback} onChange={(e) => setGrading(prev => ({ ...prev, feedback: e.target.value }))}/>
                          </div>
                          <button type="submit" className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                            <Save className="h-4 w-4" />
                            <span>Save Grade</span>
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}