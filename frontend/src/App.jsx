import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import RegistartionForm from "./pages/RegistartionForm"
import Home from "./pages/Home"
import Clients from "./pages/Clients"
import Equipment from "./pages/Equipment"
import EquipmentForm from "./pages/EquipmentForm"
import EquipmentEdition from "./pages/EquipmentEdition"
import ServiceOrder from "./pages/ServiceOrder"
import ServiceOrderForm from "./pages/ServiceOrderForm"
import ServiceOrderEdition from "./pages/ServiceOrderEdition"
import ServiceOrderView from "./pages/ServiceOrderView"
import Calibration from "./pages/Calibration"
import CalibrationForm from "./pages/CalibrationForm"
import EquipmentDetail from "./pages/EquipmentDetail"
import Team from "./pages/Team"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import Layout from "./pages/Layout"
import "./index.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}


function App() {

  const [theme, colorMode] = useMode();

  return (
    <BrowserRouter>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        
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
              path="/equipments/add"
              element={
                <ProtectedRoute>
                  <Layout >
                    <EquipmentForm />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/equipments/update/:id"
              element={
                <ProtectedRoute>
                  <Layout >
                    <EquipmentEdition/>
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/equipments/:id"
              element={
                <ProtectedRoute>
                  <Layout >
                    <EquipmentDetail />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/equipments/create-order/:id"
              element={
                <ProtectedRoute>
                  <Layout >
                    <ServiceOrderForm />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/update/:id"
              element={
                <ProtectedRoute>
                  <Layout >
                    <ServiceOrderEdition />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <Layout >
                    <ServiceOrderView />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/clients"
              element={
                <ProtectedRoute>
                  <Layout >
                    <Clients />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/equipments/create-calibration/:id"
              element={
                <ProtectedRoute>
                  <Layout >
                    <CalibrationForm />
                  </Layout>
                  
                </ProtectedRoute>
              }
            />
            <Route
              path="/team"
              element={
                <ProtectedRoute>
                  <Layout >
                    <Team />
                  </Layout>
                  
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Layout >
                    <ServiceOrder />
                  </Layout>
                  
                </ProtectedRoute>
              }
            />
            <Route
              path="/equipments"
              element={
                <ProtectedRoute>
                  <Layout >
                    <Equipment />
                  </Layout>
                  
                </ProtectedRoute>
              }
            />
            <Route
              path="/calibrations"
              element={
                <ProtectedRoute>
                  <Layout >
                    <Calibration />
                  </Layout>
                  
                </ProtectedRoute>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<RegistartionForm />} />
            <Route path="*" element={<NotFound />}></Route>

          </Routes>

      </ThemeProvider>
    </ColorModeContext.Provider>
    </BrowserRouter>
  )
}

export default App