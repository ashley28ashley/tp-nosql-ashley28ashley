import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Import de la police Sora
const link = document.createElement("link");
link.href = "https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

// Reset CSS global
const style = document.createElement("style");
style.textContent = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0A1628; color: #E2E8F0; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #0A1628; }
  ::-webkit-scrollbar-thumb { background: #1E3050; border-radius: 3px; }
  select option { background: #111D30; }
`;
document.head.appendChild(style);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);