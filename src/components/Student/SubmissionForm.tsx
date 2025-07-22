import React, { useState, useRef } from 'react';
import { X, Upload, FileText, Trash2 } from 'lucide-react';
import { Assignment } from '../../types';
interface SubmissionFormProps {assignment: Assignment; onSubmit: (content: string, attachments?: File[]) => void; onCancel: () => void;}

export function SubmissionForm({ assignment, onSubmit, onCancel }: SubmissionFormProps) {
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent) => {e.preventDefault(); onSubmit(content, attachments);};
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {if (e.target.files) {setAttachments(prev => [...prev, ...Array.from(e.target.files!)]);}};
  const removeFile = (index: number) => {setAttachments(prev => prev.filter((_, i) => i !== index));};
  const formatFileSize = (bytes: number) => {return bytes < 1024 * 1024  ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;};
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Submit Assignment</h2>
            <p className="text-sm text-gray-600">{assignment.title}</p>
          </div>
          <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Assignment Details</h3>
            <p className="text-gray-700 text-sm mb-2">{assignment.description}</p>
            <div className="flex items-center space-x-4 text-xs text-gray-600">
              <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
              <span>Max Points: {assignment.maxPoints}</span>
            </div>
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2"> Your Submission</label>
            <textarea id="content" rows={8} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" placeholder="Write your assignment submission here..." value={content} onChange={(e) => setContent(e.target.value)}/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Attachments (Optional)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600"> Click to upload files or drag and drop</p>
              <p className="text-xs text-gray-500 mt-1"> PDF, DOC, DOCX, TXT, JPG, PNG (Max 10MB each)</p>
              <input ref={fileInputRef} type="file" multiple className="hidden" accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png" onChange={handleFileChange}/>
            </div>
            {attachments.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-gray-700">Attached Files:</p>
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button type="button" onClick={() => removeFile(index)} className="p-1 text-red-500 hover:text-red-700 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"> Cancel</button>
            <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"> Submit Assignment </button>
          </div>
        </form>
      </div>
    </div>
  );
}