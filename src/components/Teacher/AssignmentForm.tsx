import React, { useState } from 'react';
import { X, Calendar, FileText, Hash } from 'lucide-react';
interface AssignmentFormProps {onSubmit: (assignment: { title: string; description: string; dueDate: string; maxPoints: number; status: 'draft' | 'published'; }) => void; onCancel: () => void;}
export function AssignmentForm({ onSubmit, onCancel }: AssignmentFormProps) {
  const [formData, setFormData] = useState({title: '', description: '', dueDate: '', maxPoints: 100, status: 'published' as 'draft' | 'published'});
  const handleSubmit = (e: React.FormEvent) => {e.preventDefault(); onSubmit(formData);};
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: name === 'maxPoints' ? parseInt(value) || 0 : value}));
  };
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Create New Assignment</h2>
          <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="inline h-4 w-4 mr-1" />
              Assignment Title
            </label>
            <input type="text" id="title" name="title" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" placeholder="Enter assignment title" value={formData.title} onChange={handleInputChange}/>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea id="description" name="description" rows={4} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" placeholder="Provide detailed instructions for the assignment" value={formData.description} onChange={handleInputChange}/>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline h-4 w-4 mr-1" />
                Due Date
              </label>
              <input type="date" id="dueDate" name="dueDate" required min={minDate} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" value={formData.dueDate} onChange={handleInputChange}/>
            </div>
            <div>
              <label htmlFor="maxPoints" className="block text-sm font-medium text-gray-700 mb-2">
                <Hash className="inline h-4 w-4 mr-1" />
                Maximum Points
              </label>
              <input type="number" id="maxPoints" name="maxPoints" required min="1" max="1000" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" value={formData.maxPoints} onChange={handleInputChange}/>
            </div>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2"> Status</label>
            <select id="status" name="status" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" value={formData.status} onChange={handleInputChange}>
              <option value="published">Published (Students can see and submit)</option>
              <option value="draft">Draft (Save for later)</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">Cancel</button>
            <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"> Create Assignment</button>
          </div>
        </form>
      </div>
    </div>
  );
}