import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthForm } from './components/Auth/AuthForm';
import { Header } from './components/Layout/Header';
import { TeacherDashboard } from './components/Teacher/TeacherDashboard';
import { StudentDashboard } from './components/Student/StudentDashboard';
import { SystemDesign } from './components/SystemDesign';
function AppContent() {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  if (!user) {
    return <AuthForm />;
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {user.role === 'teacher' ? <TeacherDashboard /> : <StudentDashboard />}
      </main>
    </div>
  );
}
function App() {
  const shouldShowDesign = window.location.search.includes('design=true');
  if (shouldShowDesign) {
    return <SystemDesign />;
  }
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
export default App;