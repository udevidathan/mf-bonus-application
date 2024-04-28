import { Footer } from "mf-core-library-v2";
import React from "react";
import { Routes, Route } from "react-router-dom";

import ErrorContainer from "../components/ErrorContainer";
import NavHeader from "../components/NavHeader";
import { PostConfirm } from "../pages/Confirm/postconfirm";
import Dashboard from "../pages/Dashboard";
import ModifyScreen from "../pages/Modify";
import Search from "../pages/Search";
import TransactionType from "../pages/TransactionType";

const Layout: React.FC = () => {
  return (
    <>
      <NavHeader />
      <ErrorContainer isLoaded={true}>
        <div>
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/ttype" element={<TransactionType />}></Route>
            <Route path="/search/:transactiontype" element={<Search />}></Route>
            <Route
              path="/modifyscreen/:jobDivaId/:transactiontype"
              element={<ModifyScreen />}
            ></Route>
            <Route
              path="/post-confirm/:jobDivaId"
              element={<PostConfirm />}
            ></Route>
          </Routes>
        </div>
      </ErrorContainer>

      <Footer app="settings" requiredLinks={["all"]} />
    </>
  );
};

export default Layout;
