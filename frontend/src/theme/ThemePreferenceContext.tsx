import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createTheme, PaletteMode } from "@mui/material";

type ThemePreferenceContextValue = {
  mode: PaletteMode;
  theme: ReturnType<typeof createTheme>;
  toggleMode: () => void;
};

const ThemePreferenceContext = createContext<ThemePreferenceContextValue | undefined>(
  undefined
);

const STORAGE_KEY = "therapist_finder_theme_mode";

export const ThemePreferenceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<PaletteMode>("light");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as PaletteMode | null;
    if (stored === "light" || stored === "dark") {
      setMode(stored);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value: ThemePreferenceContextValue = {
    mode,
    theme,
    toggleMode,
  };

  return (
    <ThemePreferenceContext.Provider value={value}>
      {children}
    </ThemePreferenceContext.Provider>
  );
};

export const useThemePreference = () => {
  const ctx = useContext(ThemePreferenceContext);
  if (!ctx) {
    throw new Error("useThemePreference must be used within ThemePreferenceProvider");
  }
  return ctx;
};

