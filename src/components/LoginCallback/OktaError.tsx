import { EmptyState, ErrorPage } from "mf-core-library-v2";
import * as React from "react";

interface OktaErrorType extends Error {
  errorCode?: string;
  errorSummary?: string;
  errorLink?: string;
  errorId?: string;
  errorCauses?: unknown[];
}
interface IProps {
  error: OktaErrorType;
}

const OktaError: React.FC<IProps> = ({ error }) => {
  const isPKCEerror = (message: string): boolean =>
    message?.toLowerCase()?.includes("pkce");

  return (
    <ErrorPage
      renderMessage={() => (
        <EmptyState
          className="without-hero"
          title="Oops!!!"
          subTitle={
            error instanceof Error && error.name && error.message
              ? isPKCEerror(error?.message || "")
                ? "Something went wrong."
                : error?.message
              : "Something went wrong."
          }
          buttonTitle="Refresh"
          onClick={() => (window.location.href = "/")}
        />
      )}
      customText="Okta Error"
      appName="shell"
      requiredArea={["content"]}
    />
  );
};

export default OktaError;
