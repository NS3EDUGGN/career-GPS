import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from './components/Navbar'
import StartTestForm from "./pages/StartTestForm"
import Quiz from './pages/Quiz'
import Result from './pages/Result'
import Diagnosis from './pages/Diagnosis'
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import Instructions from "./pages/Instructions"
import './App.css'
import AdminLogin from "./pages/AdminLogin"
import AdminDashboard from "./pages/AdminDashboard"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
<Routes>

  <Route path="/" element={<Home />} />

  <Route path="/login" element={<Login />} />

  <Route path="/start-test" element={<StartTestForm />} />

  {/* Instructions Page (after login) */}
  <Route
    path="/instructions"
    element={
      <ProtectedRoute>
        <Instructions />
      </ProtectedRoute>
    }
  />

  {/* Quiz Page (locked) */}
  <Route
    path="/quiz"
    element={
      <ProtectedRoute>
        <Quiz />
      </ProtectedRoute>
    }
  />

  {/* Result Page (locked) */}
  <Route
    path="/result"
    element={
      <ProtectedRoute>
        <Result />
      </ProtectedRoute>
    }
  />
<Route path="/admin" element={<AdminLogin/>} />
<Route path="/admin/dashboard" element={<AdminDashboard/>} />

  {/* Diagnosis Page (locked) */}
  <Route
    path="/diagnosis"
    element={
      <ProtectedRoute>
        <Diagnosis />
      </ProtectedRoute>
    }
  />

</Routes>

    </>
  )
}

export default App
