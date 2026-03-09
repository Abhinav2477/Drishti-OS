import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DrishtiProvider, useDrishti } from "@/contexts/DrishtiContext";
import Index from "@/pages/Index"; // Fixed path
import Dashboard from "@/pages/Dashboard"; // Fixed path
import NotFound from "@/pages/NotFound"; // Fixed path
import { SimulatorModal } from "@/components/SimulatorModal"; // Fixed path

const queryClient = new QueryClient();

// We need to create a new component so we can use the `useDrishti` hook
// inside the provider.
const AppLayout = () => {
  // 4. GET THE STATE from the context
  const { isSimulatorOpen } = useDrishti();

  return (
    <BrowserRouter>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* <Route path="/simulator" element={<Simulator />} /> REMOVED */}
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          {/* 5. CONDITIONALLY RENDER THE MODAL */}
          {isSimulatorOpen && <SimulatorModal />}
        </div>
      </SidebarProvider>
    </BrowserRouter>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DrishtiProvider>
        <Toaster />
        <Sonner />
        <AppLayout /> {/* Render the new layout component */}
      </DrishtiProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
