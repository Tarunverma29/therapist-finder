import { ReactNode } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Stack,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Link as RouterLink } from "react-router-dom";
import { useThemePreference } from "../../theme/ThemePreferenceContext";

interface AppShellProps {
  children: ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { mode, toggleMode } = useThemePreference();

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
          >
            Therapist Finder
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mr: 2 }}>
            <Button color="inherit" component={RouterLink} to="/search">
              Search
            </Button>
            <Button color="inherit" component={RouterLink} to="/history">
              History
            </Button>
            <Button color="inherit" component={RouterLink} to="/my-therapists">
              My Therapists
            </Button>
            <Button color="inherit" component={RouterLink} to="/messages">
              Messages
            </Button>
            <Button color="inherit" component={RouterLink} to="/settings">
              Settings
            </Button>
          </Stack>
          <IconButton color="inherit" onClick={toggleMode}>
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, pb: 4 }}>
        {children}
      </Box>
    </Box>
  );
};

