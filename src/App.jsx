import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './styles/App.css'
import MainPage from './pages/MainPage'

function App() {
  const location = useLocation()

  useEffect(() => {
    // Handle hash navigation
    if (location.hash === '#main-page') {
      // Scroll to top or specific element
      window.scrollTo(0, 0)
    }
  }, [location.hash])

  return (
    <Routes>
      <Route path="/dashboard" element={<MainPage />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default App


