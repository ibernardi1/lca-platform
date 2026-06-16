import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NewLCA from "./pages/NewLCA";
import SupplierForm from "./pages/SupplierForm";
import LCADetail from "./pages/LCADetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/new" element={<NewLCA />} />
        <Route path="/supplier-form" element={<SupplierForm />} />
        <Route path="/lca/:id" element={<LCADetail />} />
      </Routes>
    </BrowserRouter>
  );
}