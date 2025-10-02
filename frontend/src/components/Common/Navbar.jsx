import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LogOut, ListTodo } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <ListTodo className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Task Manager</h1>
          </Link>

          {user && (
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium hidden sm:block">
                {user.fullName}
              </span>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
