export const theme = {
  name: "Ocean Professional",
  colors: {
    primary: "#2563EB", // blue
    secondary: "#F59E0B", // amber
    success: "#F59E0B",
    error: "#EF4444",
    background: "#f9fafb",
    surface: "#ffffff",
    text: "#111827"
  },
  shadows: {
    sm: "0 1px 2px rgba(0,0,0,0.06)",
    md: "0 4px 8px rgba(0,0,0,0.08)",
    lg: "0 10px 15px rgba(0,0,0,0.1)"
  },
  radius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    pill: "9999px"
  },
  transitions: {
    base: "all 200ms ease",
    slow: "all 400ms ease"
  },
  gradient: "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(249,250,251,1))"
};

// Apply CSS variables to document root
export function applyThemeVars() {
  const r = document.documentElement;
  r.style.setProperty("--ocean-bg", theme.colors.background);
  r.style.setProperty("--ocean-surface", theme.colors.surface);
  r.style.setProperty("--ocean-text", theme.colors.text);
  r.style.setProperty("--ocean-primary", theme.colors.primary);
  r.style.setProperty("--ocean-secondary", theme.colors.secondary);
  r.style.setProperty("--ocean-error", theme.colors.error);
  r.style.setProperty("--ocean-shadow-sm", theme.shadows.sm);
  r.style.setProperty("--ocean-shadow-md", theme.shadows.md);
  r.style.setProperty("--ocean-shadow-lg", theme.shadows.lg);
  r.style.setProperty("--ocean-radius-sm", theme.radius.sm);
  r.style.setProperty("--ocean-radius-md", theme.radius.md);
  r.style.setProperty("--ocean-radius-lg", theme.radius.lg);
}
