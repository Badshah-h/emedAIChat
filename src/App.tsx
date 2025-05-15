import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

// Lazy load dashboard components
const WidgetManager = lazy(
  () => import("./components/dashboard/WidgetManager"),
);
const AIModelConfigurator = lazy(
  () => import("./components/dashboard/AIModelConfigurator"),
);
const IntegrationCodeGenerator = lazy(
  () => import("./components/dashboard/IntegrationCodeGenerator"),
);

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        </div>
      }
    >
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/widgets" element={<WidgetManager />} />
          <Route path="/ai-models" element={<AIModelConfigurator />} />
          <Route path="/integration" element={<IntegrationCodeGenerator />} />

          {/* Add this before the tempo routes to ensure they work */}
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
