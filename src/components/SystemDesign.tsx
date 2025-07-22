import React from 'react';
import { FileText, Database, Globe, Users, Shield, TrendingUp, ArrowRight } from 'lucide-react';
export function SystemDesign() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">EdTech Assignment Tracker</h1>
          <p className="text-xl text-gray-600">System Architecture & Design Document</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Globe className="h-6 w-6 mr-2 text-indigo-600" />
            System Architecture
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-lg mb-3">
                <Globe className="h-8 w-8 text-blue-600 mx-auto" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Frontend (React)</h3>
              <p className="text-sm text-gray-600">React with TypeScript, Tailwind CSS for responsive UI</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-lg mb-3">
                <Database className="h-8 w-8 text-green-600 mx-auto" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Backend API (Python)</h3>
              <p className="text-sm text-gray-600">FastAPI/Django REST with JWT authentication</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-lg mb-3">
                <Database className="h-8 w-8 text-purple-600 mx-auto" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Database (PostgreSQL)</h3>
              <p className="text-sm text-gray-600">Relational database with proper indexing</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Database className="h-6 w-6 mr-2 text-indigo-600" />
            Core Entities & Relationships
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Users</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• id (UUID, Primary Key)</li>
                <li>• name (String)</li>
                <li>• email (String, Unique)</li>
                <li>• password_hash (String)</li>
                <li>• role (Enum: teacher, student)</li>
                <li>• avatar_url (String, Optional)</li>
                <li>• created_at (DateTime)</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Assignments</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• id (UUID, Primary Key)</li>
                <li>• title (String)</li>
                <li>• description (Text)</li>
                <li>• due_date (DateTime)</li>
                <li>• max_points (Integer)</li>
                <li>• teacher_id (UUID, Foreign Key)</li>
                <li>• status (Enum: draft, published)</li>
                <li>• created_at (DateTime)</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Submissions</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• id (UUID, Primary Key)</li>
                <li>• assignment_id (UUID, Foreign Key)</li>
                <li>• student_id (UUID, Foreign Key)</li>
                <li>• content (Text)</li>
                <li>• grade (Integer, Optional)</li>
                <li>• feedback (Text, Optional)</li>
                <li>• status (Enum: submitted, graded)</li>
                <li>• submitted_at (DateTime)</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Relationships</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Users (Teacher) → Assignments (One-to-Many)</li>
              <li>• Assignments → Submissions (One-to-Many)</li>
              <li>• Users (Student) → Submissions (One-to-Many)</li>
              <li>• Assignment + Student → Submission (Unique constraint)</li>
            </ul>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FileText className="h-6 w-6 mr-2 text-indigo-600" />
            API Endpoints
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Authentication</h3>
              <div className="space-y-3">
                <div className="p-3 border border-gray-200 rounded">
                  <div className="font-mono text-sm">
                    <span className="text-green-600 font-bold">POST</span> /api/auth/signup
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Register new user (teacher/student)</p>
                </div>
                <div className="p-3 border border-gray-200 rounded">
                  <div className="font-mono text-sm">
                    <span className="text-blue-600 font-bold">POST</span> /api/auth/login
                  </div>
                  <p className="text-xs text-gray-600 mt-1">User login with email/password</p>
                </div>
                <div className="p-3 border border-gray-200 rounded">
                  <div className="font-mono text-sm">
                    <span className="text-red-600 font-bold">POST</span> /api/auth/logout
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Invalidate user session</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Assignments</h3>
              <div className="space-y-3">
                <div className="p-3 border border-gray-200 rounded">
                  <div className="font-mono text-sm">
                    <span className="text-green-600 font-bold">POST</span> /api/assignments
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Create assignment (teachers only)</p>
                </div>
                <div className="p-3 border border-gray-200 rounded">
                  <div className="font-mono text-sm">
                    <span className="text-blue-600 font-bold">GET</span> /api/assignments
                  </div>
                  <p className="text-xs text-gray-600 mt-1">List assignments (role-based filtering)</p>
                </div>
                <div className="p-3 border border-gray-200 rounded">
                  <div className="font-mono text-sm">
                    <span className="text-purple-600 font-bold">PUT</span> /api/assignments/{'{id}'}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Update assignment (teachers only)</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Submissions</h3>
              <div className="space-y-3">
                <div className="p-3 border border-gray-200 rounded">
                  <div className="font-mono text-sm">
                    <span className="text-green-600 font-bold">POST</span> /api/submissions
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Submit assignment (students only)</p>
                </div>
                <div className="p-3 border border-gray-200 rounded">
                  <div className="font-mono text-sm">
                    <span className="text-blue-600 font-bold">GET</span> /api/submissions
                  </div>
                  <p className="text-xs text-gray-600 mt-1">List submissions (role-based)</p>
                </div>
                <div className="p-3 border border-gray-200 rounded">
                  <div className="font-mono text-sm">
                    <span className="text-purple-600 font-bold">PUT</span> /api/submissions/{'{id}'}/grade
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Grade submission (teachers only)</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">File Management</h3>
              <div className="space-y-3">
                <div className="p-3 border border-gray-200 rounded">
                  <div className="font-mono text-sm">
                    <span className="text-green-600 font-bold">POST</span> /api/files/upload
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Upload assignment files</p>
                </div>
                <div className="p-3 border border-gray-200 rounded">
                  <div className="font-mono text-sm">
                    <span className="text-blue-600 font-bold">GET</span> /api/files/{'{id}'}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Download/view uploaded files</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Shield className="h-6 w-6 mr-2 text-indigo-600" />
            Authentication & Security
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Authentication Flow</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <p className="text-sm text-gray-700">User submits credentials (email/password)</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <p className="text-sm text-gray-700">Server validates credentials against database</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <p className="text-sm text-gray-700">JWT token issued with user role & permissions</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                  <p className="text-sm text-gray-700">Token stored in secure httpOnly cookie</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Measures</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Password hashing with bcrypt (salt rounds: 12)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>JWT tokens with 24h expiration</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Role-based access control (RBAC)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>SQL injection protection via ORM</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>CSRF protection with tokens</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Rate limiting on authentication endpoints</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
            <h3 className="text-lg font-semibold text-indigo-900 mb-2">Role Permissions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-indigo-800 mb-2">Teachers</h4>
                <ul className="text-sm text-indigo-700 space-y-1">
                  <li>• Create/edit/delete assignments</li>
                  <li>• View all submissions for their assignments</li>
                  <li>• Grade submissions and provide feedback</li>
                  <li>• Manage assignment visibility (draft/published)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-indigo-800 mb-2">Students</h4>
                <ul className="text-sm text-indigo-700 space-y-1">
                  <li>• View published assignments</li>
                  <li>• Submit assignments with files</li>
                  <li>• View their own submissions and grades</li>
                  <li>• Edit submissions before due date</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 mr-2 text-indigo-600" />
            Scaling Strategy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Short-term Optimizations</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <ArrowRight className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <span>Database indexing on frequently queried fields</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowRight className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <span>API response caching with Redis</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowRight className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <span>File storage optimization with CDN</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowRight className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <span>Connection pooling and query optimization</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowRight className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <span>Pagination for large data sets</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Long-term Architecture</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <ArrowRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Microservices architecture (Auth, Assignment, File services)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Read replicas for database scaling</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Event-driven architecture with message queues</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Container orchestration with Kubernetes</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Global CDN and edge computing for file delivery</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h3 className="text-lg font-semibold text-green-900 mb-2">Performance Targets</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-800">10k+</div>
                <div className="text-green-700">Concurrent Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-800">&lt;200ms</div>
                <div className="text-green-700">API Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-800">99.9%</div>
                <div className="text-green-700">Uptime SLA</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}