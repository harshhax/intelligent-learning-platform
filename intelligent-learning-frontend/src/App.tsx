import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/layouts/DashboardLayout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Skills from "@/pages/Skills";
import Quiz from "@/pages/Quiz";
import Results from "@/pages/Results";
import WeakTopics from "@/pages/WeakTopics";
import StudyPlan from "@/pages/StudyPlan";
import Recommendations from "@/pages/Recommendations";
import Leaderboard from "@/pages/Leaderboard";
import Forum from "@/pages/Forum";
import Profile from "@/pages/Profile";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import CourseManagement from "@/pages/admin/CourseManagement";
import QuestionUpload from "@/pages/admin/QuestionUpload";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <DashboardLayout>{children}</DashboardLayout>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== "admin") return <Navigate to="/dashboard" replace />;
  return <DashboardLayout>{children}</DashboardLayout>;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />

      {/* Student Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/skills" element={<ProtectedRoute><Skills /></ProtectedRoute>} />
      <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
      <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
      <Route path="/weak-topics" element={<ProtectedRoute><WeakTopics /></ProtectedRoute>} />
      <Route path="/study-plan" element={<ProtectedRoute><StudyPlan /></ProtectedRoute>} />
      <Route path="/recommendations" element={<ProtectedRoute><Recommendations /></ProtectedRoute>} />
      <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
      <Route path="/forum" element={<ProtectedRoute><Forum /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

      {/* Admin Routes */}
      <Route path="/admin/courses" element={<AdminRoute><CourseManagement /></AdminRoute>} />
      <Route path="/admin/questions" element={<AdminRoute><QuestionUpload /></AdminRoute>} />
      <Route path="/admin/analytics" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/materials" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/students" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/settings" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
