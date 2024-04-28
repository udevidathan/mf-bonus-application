import {
  ErrorPage,
  EmptyState,
  ErrorCodesWithMsg,
  useErrorHandling,
  Alert,
} from "mf-core-library-v2";
import React, { useState, useEffect } from "react";

import { useErrorStore } from "../../stores/useErrorStore";

interface IProps {
  isLoaded: boolean;
  children?: React.ReactNode;
}

const ErrorContainer: React.FC<IProps> = ({ children, isLoaded }) => {
  // const { currentENV } = useContext(AdminContext);
  const { errorResult, apisErrorResult } = useErrorStore();
  const [errorResults, setErrorResults] = useState<errorObj[]>([]);
  const [isApiDown, setIsApiDown] = useState<errorObj[]>([]);

  const { errorMessages: errorMessage, alertErrors } = useErrorHandling(
    errorResults || []
  );

  useEffect(() => {
    if (apisErrorResult.length > 0) {
      setIsApiDown(apisErrorResult);
    }
  }, [apisErrorResult]);

  useEffect(() => {
    if (errorResult?.length > 0) {
      const errors: errorObj[] = Object.values(
        (errorResult as errorObj[])?.reduce(
          (acc, obj) => ({ ...acc, [obj.code]: obj }),
          {}
        )
      );

      setErrorResults(errors);
    }
  }, [errorResult]);

  const renderErrorMessage = (
    errorMessage: errorResult
  ): React.ReactElement => {
    return (
      <ErrorPage
        customText={"Oops!"}
        requiredArea={["content"]}
        renderMessage={() => (
          <EmptyState
            className="without-hero"
            buttonTitle={"Start again"}
            onClick={() => window.location.replace("/")}
            subTitle={errorMessage?.user_message || ""}
            title={""}
          />
        )}
      />
    );
  };

  if (isLoaded && isApiDown.length > 0) {
    const getErrorMessage = ErrorCodesWithMsg.filter(
      (item) => item.http_code === isApiDown[0].code
    )[0];

    return renderErrorMessage(getErrorMessage);
  }

  if (isLoaded && errorMessage?.user_message) {
    return renderErrorMessage(errorMessage);
  }

  return (
    <>
      {children}
      {alertErrors.length > 0 && <Alert data={alertErrors} />}
    </>
  );
};

export default ErrorContainer;
