import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from "@tanstack/react-query";
import React from "react";
import "react-day-picker/dist/style.css";
import { BrowserRouter as Router } from "react-router-dom";

import AuthRoute from "./Routes/AuthRoute";
import { useErrorStore } from "./stores/useErrorStore";

import "./index.scss";

const App: React.FC = () => {
  const { updateApisErrorResults, updateErrorResults } = useErrorStore();

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onSuccess<T>(data: unknown) {
        const typedData = data as SuccessResponse<T>;

        if (typedData?.data?.errors?.length > 0) {
          updateErrorResults(typedData?.data?.errors);
        }

        return data;
      },

      onError(error: unknown) {
        const typedError = error as ErrorResponse;

        updateApisErrorResults([
          {
            code: typedError?.response?.status || 500,
            type: "API DOWN",
            fieldPath: "",
            logs: "",
            message: typedError?.response?.statusText || "Server Error",
            userMessage: "",
          },
        ]);
      },
    }),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthRoute />
      </Router>
    </QueryClientProvider>
  );
};

export default App;
