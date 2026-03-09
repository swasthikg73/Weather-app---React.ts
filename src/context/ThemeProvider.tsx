import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "dark" | "light";

type ContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

type Props = {
  children: ReactNode;
};

const ThemeContext = createContext<ContextType | undefined>(undefined);

export default function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState<Theme>("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("UseTheme must be used within a ThemeProvider");
  return context;
};
