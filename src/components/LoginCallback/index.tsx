import { Tokens } from "@okta/okta-auth-js";
import { useOktaAuth } from "@okta/okta-react";
import * as React from "react";

import OktaError from "./OktaError";

interface LoginCallbackProps {
  errorComponent?: React.ComponentType<{ error: Error }>;
  loadingElement?: React.ReactElement;
}

export const LoginCallback: React.FC<LoginCallbackProps> = ({
  errorComponent,
  loadingElement = null,
}) => {
  const { oktaAuth, authState } = useOktaAuth();
  const [callbackError, setCallbackError] = React.useState<Error | null>(null);
  const ErrorReporter = errorComponent || OktaError;

  React.useEffect(() => {
    const getTokens = async (): Promise<Tokens> => {
      const res = await oktaAuth.token.parseFromUrl();

      return res?.tokens || undefined;
    };

    const loginRedirect = async (): Promise<void> => {
      try {
        await oktaAuth.handleLoginRedirect(
          await getTokens(),
          oktaAuth.getOriginalUri()
        );
      } catch (error) {
        setCallbackError(error as Error);
      }
    };

    oktaAuth.isLoginRedirect() && loginRedirect();
  }, [oktaAuth]);

  const authError = authState?.error;
  const displayError = callbackError || authError;

  if (displayError) {
    return <ErrorReporter error={displayError} />;
  }

  return loadingElement;
};
