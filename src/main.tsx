import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import  renderPage  from "vike/client";
import Layout from "./layouts/Layout";
import "./styles/index.css";
import "./styles/App.css";

const container = document.getElementById("root");
if (!container) {
  throw new Error("root element not found");
}

createRoot(container).render(
  renderPage(({ Page }:{ Page: React.ComponentType }) => (
    <StrictMode>
      <Layout>
        <Page />
      </Layout>
    </StrictMode>
  ))
);
