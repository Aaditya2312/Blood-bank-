import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import Donar from "./pages/Dashboard/Donar";
import Hospitals from "./pages/Dashboard/Hospitals";
import OrganisationPage from "./pages/Dashboard/OrganisationPage";
import Consumer from "./pages/Dashboard/Consumer";
import Donation from "./pages/Donation";
import Analytics from "./pages/Dashboard/Analytics";
import DonarList from "./pages/Admin/DonarList";
import OrgList from "./pages/Admin/OrgList";
import HospitalList from "./pages/Admin/HospitalList";
import AdminHome from "./pages/Admin/AdminHome";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          } />
          <Route path="/donar-list" element={
            <ProtectedRoute>
              <DonarList />
            </ProtectedRoute>
          } />
          <Route path="/org-list" element={
            <ProtectedRoute>
              <OrgList />
            </ProtectedRoute>
          } />
          <Route path="/hospital-list" element={
            <ProtectedRoute>
              <HospitalList />
            </ProtectedRoute>
          } />
          <Route path="/hospital" element={
            <ProtectedRoute>
              <Hospitals />
            </ProtectedRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          } />
          <Route path="/consumer" element={
            <ProtectedRoute>
              <Consumer />
            </ProtectedRoute>
          } />
          <Route path="/donation" element={
            <ProtectedRoute>
              <Donation />
            </ProtectedRoute>
          } />
          <Route path="/organisation" element={
            <ProtectedRoute>
              <OrganisationPage />
            </ProtectedRoute>
          } />
          <Route path="/donar" element={
            <ProtectedRoute>
              <Donar />
            </ProtectedRoute>
          } />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>} />
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}


export default App;
