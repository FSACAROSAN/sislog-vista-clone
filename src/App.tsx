
import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppLayout from "./pages/AppLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import Empresa from "./pages/Empresa";
import Paises from "./pages/Paises";
import Ciudades from "./pages/Ciudades";
import CentroLogisticoPage from "./pages/CentroLogistico";
import BodegasPage from "./pages/Bodegas";

const App = () => {
  // Create a client
  const [queryClient] = useState(() => new QueryClient());

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/" element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Index />} />
                  <Route path="empresa" element={<Empresa />} />
                  <Route path="paises" element={<Paises />} />
                  <Route path="ciudades" element={<Ciudades />} />
                  <Route path="centro-logistico" element={<CentroLogisticoPage />} />
                  <Route path="bodegas" element={<BodegasPage />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
