import { Routes, Route, Navigate } from "react-router-dom";
import { Container, Box } from "@mui/material";
import { AppShell } from "./components/layout/AppShell";

const Placeholder: React.FC<{ label: string }> = ({ label }) => (
  <Box mt={4}>{label}</Box>
);

export const App: React.FC = () => {
  return (
    <AppShell>
      <Container>
        <Routes>
          <Route path="/" element={<Navigate to="/search" replace />} />
          <Route path="/login" element={<Placeholder label="Login page" />} />
          <Route path="/signup" element={<Placeholder label="Signup page" />} />
          <Route path="/search" element={<Placeholder label="Search + Map page" />} />
          <Route path="/therapists/:id" element={<Placeholder label="Therapist detail" />} />
          <Route path="/history" element={<Placeholder label="History page" />} />
          <Route path="/my-therapists" element={<Placeholder label="My therapists page" />} />
          <Route path="/messages" element={<Placeholder label="Messages inbox" />} />
          <Route path="/settings" element={<Placeholder label="Settings page" />} />
        </Routes>
      </Container>
    </AppShell>
  );
};

