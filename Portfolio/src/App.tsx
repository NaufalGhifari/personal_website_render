
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import BCRCalculator from "./pages/BCRCalculator";
import NPVCalculator from "./pages/NPVCalculator";
import TabletFriability from "./pages/TabletFriability";
import StockProcurement from "./pages/StockProcurement";
import DosageCalculator from "./pages/DosageCalculator";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import PageTransition from "./components/PageTransition";
import Pricing from "./pages/Pricing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <PageTransition>
          <Routes>
            <Route path="/pharmacy" element={<Index />} />
            <Route path="/pharmacy/bcr-calculator" element={<BCRCalculator />} />
            <Route path="/pharmacy/npv-calculator" element={<NPVCalculator />} />
            <Route path="/pharmacy/tablet-friability" element={<TabletFriability />} />
            <Route path="/pharmacy/stock-procurement" element={<StockProcurement />} />
            <Route path="/pharmacy/dosage-calculator" element={<DosageCalculator />} />
            <Route path="/pharmacy/pricing" element={<Pricing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
