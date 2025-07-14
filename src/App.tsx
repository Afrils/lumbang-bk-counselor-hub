
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Students from "./pages/Students";
import Materials from "./pages/Materials";
import Analytics from "./pages/Analytics";
import Attendance from "./pages/Attendance";
import Schedule from "./pages/Schedule";
import Individual from "./pages/counseling/Individual";
import Group from "./pages/counseling/Group";
import Academic from "./pages/counseling/Academic";
import Talent from "./pages/counseling/Talent";
import Career from "./pages/counseling/Career";
import Reports from "./pages/counseling/Reports";
import Surveys from "./pages/Surveys";
import LessonPlans from "./pages/LessonPlans";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: (failureCount, error: any) => {
        // Don't retry on auth errors
        if (error?.status === 401 || error?.code === 'PGRST301') {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/students" 
                element={
                  <ProtectedRoute>
                    <Students />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/materials" 
                element={
                  <ProtectedRoute>
                    <Materials />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/analytics" 
                element={
                  <ProtectedRoute>
                    <Analytics />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/attendance" 
                element={
                  <ProtectedRoute>
                    <Attendance />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/schedule" 
                element={
                  <ProtectedRoute>
                    <Schedule />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/counseling/individual" 
                element={
                  <ProtectedRoute>
                    <Individual />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/counseling/group" 
                element={
                  <ProtectedRoute>
                    <Group />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/counseling/academic" 
                element={
                  <ProtectedRoute>
                    <Academic />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/counseling/talent" 
                element={
                  <ProtectedRoute>
                    <Talent />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/counseling/career" 
                element={
                  <ProtectedRoute>
                    <Career />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/counseling/reports" 
                element={
                  <ProtectedRoute>
                    <Reports />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/surveys" 
                element={
                  <ProtectedRoute>
                    <Surveys />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/lesson-plans" 
                element={
                  <ProtectedRoute>
                    <LessonPlans />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
