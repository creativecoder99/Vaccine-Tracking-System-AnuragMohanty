import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { ChildProvider } from './context/ChildContext';

function App() {
  return (
    <div className="min-h-screen bg-background text-textPrimary">
      <AuthProvider>
        <ChildProvider>
          <AppRoutes />
        </ChildProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
