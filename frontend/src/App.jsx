import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import EquipmentForm from "./pages/EquipmentForm"
import CalibrationForm from "./pages/CalibrationForm"
import ServiceOrderForm from "./pages/ServiceOrderForm"
import DetailedEquipment from "./pages/DetailedEquipment"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-equip"
          element={
            <ProtectedRoute>
              <EquipmentForm />
            </ProtectedRoute>
          }
        />
                <Route
          path="/show-equip"
          element={
            <ProtectedRoute>
              <DetailedEquipment />
            </ProtectedRoute>
          }
        />
                <Route
          path="/create-so"
          element={
            <ProtectedRoute>
              <ServiceOrderForm />
            </ProtectedRoute>
          }
        />
                <Route
          path="/add-calib"
          element={
            <ProtectedRoute>
              <CalibrationForm />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App