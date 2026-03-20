import {BrowserRouter , Routes , Route} from 'react-router-dom'
import '@coreui/coreui/dist/css/coreui.min.css';
import AdminAuth from './pages/AdminAuth'
import Dashboard from './pages/Dashboard'
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<AdminAuth />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
    
    </BrowserRouter>
  )
}

export default App