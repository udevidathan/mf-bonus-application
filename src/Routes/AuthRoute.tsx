import OktaAuth, { toRelativeUrl } from "@okta/okta-auth-js";
import { Security } from "@okta/okta-react";
import React, { useCallback, useEffect } from "react";
import Helmet from "react-helmet";
import { Route, Routes, useNavigate } from "react-router-dom";

import AuthProtectedRoute from "../Auth/AuthProtectedRoute";
import { getAuth } from "../Auth/OktaAuth";
import { LoginCallback } from "../components/LoginCallback";
import Skeleton from "../components/Skeleton/Skeleton";
import Layout from "../layout";

const LOGIN_CALLBACK = process.env.REACT_APP_CALLBACK_PATH;

const AuthRoute: React.FC = () => {
  const navigate = useNavigate();
  const oktaAuth = getAuth();

  const restoreOriginalUri = useCallback(
    (_oktaAuth: OktaAuth, originalUri: unknown): void => {
      navigate(
        toRelativeUrl((originalUri as string) || "/", window.location.origin)
      );
    },
    []
  );

  useEffect(() => {
    return () => {
      oktaAuth.options.restoreOriginalUri = undefined;
    };
  }, []);

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Routes>
        <Route
          path={LOGIN_CALLBACK}
          element={<LoginCallback loadingElement={<Skeleton />} />}
        />
        <Route path="/*" element={<AuthProtectedRoute />}>
          <Route
            path="/*/*"
            element={
              <>
                <Helmet>
                  <title>{"Bonus application"}</title>
                </Helmet>
                <Layout />
              </>
            }
          />
        </Route>
      </Routes>
    </Security>
  );
};

export default AuthRoute;
