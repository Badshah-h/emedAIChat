import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import { routes as appRoutes } from "./routes";
import tempoRoutes from "tempo-routes";
import { Toaster } from "@/components/ui/toaster";

// Lazy load landing page
const LandingPage = lazy(() => import("@/components/landing/LandingPage"));

// Loading component
const LoadingFallback = () => (
  <div className="flex h-screen w-full items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-2">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <>
        <Toaster />
        <Routes>
          {/* Make landing page the default route */}
          <Route path="/" element={<LandingPage />} />

          {/* Dashboard routes */}
          {appRoutes
            .filter(route => route.path !== "/landing" && route.path !== "/")
            .map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}

          {/* Add this before the tempo routes to ensure they work */}
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(tempoRoutes)}
      </>
    </Suspense>
  );
}

export default App;
