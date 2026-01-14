import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { PropertyDetails } from './pages/PropertyDetails';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { CreateProperty } from './pages/admin/CreateProperty';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/property/:id" element={<PropertyDetails />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/create"
        element={
          <ProtectedRoute>
            <CreateProperty />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
