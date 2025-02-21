import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/main.css";
import MemoryGame from "./components/MemoryGame";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MemoryGame />
  </StrictMode>
);
