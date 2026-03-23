import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminAuth from './pages/AdminAuth';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Certificates from './pages/Certificates';
import Capabilities from './pages/Capabilities';
import AppLayout from './components/layout/AppLayout';
import ProtectedRoute from './components/protected/protectedroutes';
import About from './pages/About';
import ExperienceAdmin from './pages/ExperienceAdmin';
import ClientRecomAdmin from './pages/ClientRecomendation';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Login Route */}
        <Route path='/' element={<AdminAuth />} />
        <Route path="/login" element={<AdminAuth />} />
        {/* Protected Admin Routes Wrap */}
        <Route element={<AppLayout />}>
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path='/projects' element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          } />
          <Route path='/certificates' element={
            <ProtectedRoute>
              <Certificates />
            </ProtectedRoute>
          } />
          <Route path='/capabilities' element={
            <ProtectedRoute>
              <Capabilities />
            </ProtectedRoute>
          } />
          <Route path='/about' element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          } />
          <Route path='/experience' element={
            <ProtectedRoute>
              <ExperienceAdmin />
            </ProtectedRoute>
          } />
          <Route path='/client-recom' element={
            <ProtectedRoute>
              <ClientRecomAdmin />
            </ProtectedRoute>
          } />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;