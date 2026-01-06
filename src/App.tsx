import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CEODashboard from "@/interfaces/ceo-dashboard";
import RevenueCommandCenter from "@/interfaces/revenue-command-center";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Navigation = () => {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-card border-b border-border px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-lg font-bold text-foreground">
            Growth Engine
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/ceo-dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              CEO Dashboard
            </Link>
            <Link to="/revenue" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Revenue Center
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground">{user.email}</span>
              <button
                onClick={signOut}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/auth" className="text-sm text-primary hover:text-primary/80 transition-colors">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-background">
    <Navigation />
    {children}
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout><Index /></AppLayout>} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/ceo-dashboard" element={<AppLayout><CEODashboard /></AppLayout>} />
            <Route path="/revenue" element={<AppLayout><RevenueCommandCenter /></AppLayout>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;