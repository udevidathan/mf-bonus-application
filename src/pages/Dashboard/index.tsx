import { Heading3 } from "mf-core-library-v2";
import React from "react";

// import { useNavigate } from "react-router-dom";
import NewTransaction from "../../components/NewTransaction";
import Container from "../Container";

export const Dashboard: React.FC = () => {
  // const navigate = useNavigate();

  return (
    <Container>
      <Heading3>Transaction details</Heading3>
      <NewTransaction text={"New transaction"} />
      {/* <Button
        size="lg"
        onClick={() => {
          navigate({
            pathname: "/ttype",
          });
        }}
      >
        <Icons name={Icon.PLUS} />
        Create new transaction
      </Button> */}
    </Container>
  );
};

export default Dashboard;
