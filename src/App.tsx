
import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
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
import StandsPage from "./pages/Stands";
import TarifasGenerales from "./pages/TarifasGenerales";
import Terceros from "./pages/Terceros";
import UnidadesMedida from "./pages/UnidadesMedida";
import Equipos from "./pages/Equipos";

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
            <LanguageProvider>
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
                    <Route path="stands" element={<StandsPage />} />
                    <Route path="tarifas-generales" element={<TarifasGenerales />} />
                    <Route path="terceros" element={<Terceros />} />
                    <Route path="unidades-medida" element={<UnidadesMedida />} />
                    <Route path="equipos" element={<Equipos />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </LanguageProvider>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
