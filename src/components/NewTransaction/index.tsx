import { Button, Icons, Icon } from "mf-core-library-v2";
import React from "react";
import { useNavigate } from "react-router-dom";
interface TransactionProps {
  text?: string;
}

const NewTransaction: React.FC<TransactionProps> = ({ text = "" }) => {
  const navigate = useNavigate();

  return (
    <Button
      size="lg"
      onClick={() => {
        navigate({
          pathname: "/ttype",
        });
      }}
    >
      <Icons name={Icon.PLUS} />
      {text || "Create new transaction"}
    </Button>
  );
};

export default NewTransaction;
