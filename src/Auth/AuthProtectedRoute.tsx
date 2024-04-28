import { toRelativeUrl } from "@okta/okta-auth-js";
import { useOktaAuth } from "@okta/okta-react";
import { userSession, ErrorPage } from "mf-core-library-v2";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import useOktaIntrospect from "../hooks/useOktaIntrospect";

const AuthProtectedRoute: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { oktaAuth, authState } = useOktaAuth();

  const oktaTokenStorage =
    JSON.parse(localStorage.getItem("okta-token-storage") ?? "{}") || "";

  const {
    isLoading: oktaLoading,
    isError: isOktaError,
    error: oktaError,
    data: oktaData,
  } = useOktaIntrospect({
    token: "",
    token_type_hint: "access_token",
  });

  const initialAuth = (): void => {
    if (authState && authState.isAuthenticated) {
      setIsAuthenticated(true);
      userSession.create();
    } else {
      const originalUri = toRelativeUrl(
        window.location.href,
        window.location.origin
      );

      oktaAuth.setOriginalUri(originalUri);
      oktaAuth.signInWithRedirect();
    }
  };

  useEffect(() => {
    initialAuth();
  }, []);

  useEffect(() => {
    if (oktaData && !oktaLoading) {
      const { active } = oktaData;

      const AuthData =
        active && oktaData?.client_id === oktaTokenStorage?.idToken?.clientId;

      setIsAuthenticated(AuthData);
    }
  }, [oktaData]);

  if (oktaLoading) {
    return <Outlet context={{ oktaLoading: oktaLoading || false }} />;
  }

  if (isOktaError) {
    return (
      <ErrorPage
        customText={oktaError instanceof Error ? oktaError?.message : "Error"}
        requiredArea={["content"]}
      />
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <Outlet />;
};

export default AuthProtectedRoute;
