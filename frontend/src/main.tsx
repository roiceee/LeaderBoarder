import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/index.css";
import App from "./pages/App.tsx";
import { AuthProvider } from "react-oidc-context";
import { UserManagerSettings } from "oidc-client-ts";
import { BrowserRouter, Route, Routes } from "react-router";
import Callback from "./pages/Callback.tsx";

const cognitoAuthConfig: UserManagerSettings = {
  authority:
    "https://cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_dYUFWFByP",
  client_id: "t4154o3mdk97uhvjmunqgmf",
  redirect_uri: "http://localhost:5173/callback",
  response_type: "code",
  scope: "openid",
  automaticSilentRenew: true,
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App/>}/>
          <Route path="/callback" element={<Callback/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
