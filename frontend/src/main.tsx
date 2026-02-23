import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { App } from "./App";
import { useThemePreference, ThemePreferenceProvider } from "./theme/ThemePreferenceContext";

const queryClient = new QueryClient();

const ThemedApp: React.FC = () => {
  const { theme } = useThemePreference();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemePreferenceProvider>
        <ThemedApp />
      </ThemePreferenceProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

