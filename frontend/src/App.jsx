import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import EquipmentForm from "./components/EquipmentForm"
import CalibrationForm from "./pages/CalibrationForm"
import ServiceOrderForm from "./pages/ServiceOrderForm"
import DetailedEquipment from "./pages/DetailedEquipment"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import Layout from "./pages/Layout"
import "./index.css";

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
              <Layout >
                <Home />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-equip"
          element={
            <ProtectedRoute>
              <Layout >
                <EquipmentForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/show-equip"
          element={
            <ProtectedRoute>
              <Layout >
                <DetailedEquipment />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-so"
          element={
            <ProtectedRoute>
              <Layout >
                <ServiceOrderForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-calib"
          element={
            <ProtectedRoute>
              <Layout >
                <CalibrationForm />
              </Layout>
              
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