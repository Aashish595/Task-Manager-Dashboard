import { Link } from 'react-router-dom';
import { CheckCircle, Lock, Zap, ListTodo } from 'lucide-react';

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <ListTodo className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Task Manager</h1>
            </div>
            <div className="flex gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Manage Your Tasks Efficiently
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A powerful full-stack task management application with secure authentication
            and real-time updates.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
          >
            Start Managing Tasks
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Easy Task Management</h3>
            <p className="text-gray-600">
              Create, update, and organize your tasks with an intuitive interface and powerful search.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Authentication</h3>
            <p className="text-gray-600">
              Your data is protected with JWT authentication and encrypted passwords.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Fast & Scalable</h3>
            <p className="text-gray-600">
              Built with modern tech stack for optimal performance and scalability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
