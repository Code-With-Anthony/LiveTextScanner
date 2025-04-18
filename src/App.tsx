import { Toaster as Sonner } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardOverview from "./components/dashboard/DashboardOverview";
import Page from "./components/dashboard/page";
import ScanHistory from "./components/dashboard/ScanHistory";
import TextScanner from "./components/dashboard/TextScanner";
import { AuthProvider } from "./hooks/use-auth";
import Index from "./pages";
import Auth from "./pages/auth/Auth";
import AuthCallback from "./pages/auth/AuthCallback";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="vite-ui-theme"
        >
          <Sonner richColors />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/dashboard" element={<Page />}>
                <Route index element={<DashboardOverview />} />
                <Route path="scan" element={<TextScanner />} />
                <Route path="scan-history" element={<ScanHistory />} />
              </Route>
              <Route path="/features" element={<Index section="features" />} />
              <Route
                path="/how-it-works"
                element={<Index section="how-it-works" />}
              />
              <Route path="/pricing" element={<Index section="pricing" />} />
              <Route
                path="/testimonials"
                element={<Index section="testimonials" />}
              />
              <Route path="/faq" element={<Index section="faq" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
