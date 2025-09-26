import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { applyThemeVars } from "./theme";
import LandingLogin from "./pages/LandingLogin";
import ChatRoom from "./pages/ChatRoom";
import Settings from "./pages/Settings";

// PUBLIC_INTERFACE
export default function App() {
  /** Root application: sets theme variables and configures routes. */
  useEffect(() => {
    applyThemeVars();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingLogin />} />
        <Route path="/login" element={<LandingLogin />} />
        <Route path="/chat" element={<ChatRoom />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
