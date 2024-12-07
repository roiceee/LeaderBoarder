import { WebStorageStateStore } from "oidc-client-ts";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider, AuthProviderProps } from "react-oidc-context";
import { BrowserRouter, Route, Routes } from "react-router";
import "./assets/index.css";
import App from "./pages/App.tsx";

const cognitoAuthConfig: AuthProviderProps = {
  authority:
    "https://cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_dYUFWFByP",
  client_id: "t4154o3mdk97uhvjmunqgmf",
  redirect_uri: "http://localhost:5173",
  response_type: "code",
  scope: "openid",
  automaticSilentRenew: true,
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
  userStore: new WebStorageStateStore({ store: window.localStorage }),
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
