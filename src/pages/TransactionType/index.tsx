import {
  Heading6,
  Button,
  Radio,
  Accordion,
  useIsMobile,
  Input,
} from "mf-core-library-v2";
import React from "react";
import { useNavigate } from "react-router-dom";

import { LayoutItem } from "../../layout/layout";
import { useSearchStore } from "../../stores/useSearchStore";
import Container from "../Container";

export const TransactionType: React.FC = () => {
  const [transactionType, setTransactionType] = React.useState("");
  const [searchValue, setSearchValue] = React.useState<string | null>("");
  const [accordion1, setAccordion1] = React.useState<boolean>(true);
  const [accordion2, setAccordion2] = React.useState<boolean>(true);
  const [accordion3, setAccordion3] = React.useState<boolean>(true);
  const { isMobile } = useIsMobile("");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [fname, setFname] = React.useState<string>("");
  const [lname, setLname] = React.useState<string>("");
  const navigate = useNavigate();

  const { updateSearchType, updateTransactionType, updateQuery, updateName } =
    useSearchStore();

  const searchInformation1 = [
    {
      key: "startID",
      value: "Start ID",
    },
    {
      key: "jobID",
      value: "Job Number",
    },
    {
      key: "vmsID",
      value: "VMS ID",
    },
    {
      key: "candidateName",
      value: "Candidate Name",
    },
    {
      key: "clientName",
      value: "Client Name",
    },
  ];

  const handleRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setTransactionType(event.target.value);
  };

  const handleRadioChangeSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchValue(event.target.value);
  };

  const searchContainer = (): React.ReactNode => {
    return searchInformation1.map((data, index) => {
      return (
        <div className="radioPadding" key={index}>
          <Radio
            onChange={handleRadioChangeSearch}
            checked={searchValue === data.value}
            value={data.value}
            disabled={false}
            radioSize={"sm"}
          />
        </div>
      );
    });
  };

  const dynamicTitle = (type: string): string | null => {
    const filter = searchInformation1.filter(
      (data) => data.value === searchValue
    );

    return filter.length > 0
      ? type === "value"
        ? filter[0].value
        : filter[0].key
      : null;
  };

  const saveDatatoStore = (): void => {
    updateSearchType(searchValue);
    updateTransactionType(transactionType);
    updateQuery(searchQuery);
    updateName({
      fname,
      lname,
    });

    setTimeout(() => {
      navigate({
        pathname: `/search/${encodeURI(transactionType)}`,
      });
    }, 300);
  };

  return (
    <Container>
      <LayoutItem
        className={`item-gap ${!isMobile ? `` : ``}`}
        layoutIdentifier={`listing-mobile`}
      >
        <Accordion
          isRounded
          size="small"
          title={<Heading6>Select transaction type</Heading6>}
          variant="primary"
          iconSize="md"
          isOpen={accordion1}
          setIsOpen={(param) => {
            setAccordion1(param);
          }}
        >
          <div className="radioContainer">
            <div className="radioPadding">
              <Radio
                onChange={handleRadioChange}
                checked={transactionType === "Discretory bonus"}
                value="Discretory bonus"
                disabled={false}
                radioSize={"sm"}
              />
            </div>
            <div className="radioPadding">
              <Radio
                onChange={handleRadioChange}
                checked={transactionType === "Non Discretory bonus"}
                value="Non Discretory bonus"
                disabled={false}
                radioSize={"sm"}
              />
            </div>
            <div className="radioPadding">
              <Radio
                onChange={handleRadioChange}
                checked={transactionType === "Adjustment"}
                value="Adjustment"
                disabled={false}
                radioSize={"sm"}
              />
            </div>
            <div className="radioPadding">
              <Radio
                onChange={handleRadioChange}
                checked={transactionType === "Client charged paid sick leave"}
                value="Client charged paid sick leave"
                disabled={false}
                radioSize={"sm"}
              />
            </div>
          </div>
        </Accordion>
        {transactionType ? (
          <Accordion
            isRounded
            size="small"
            title={<Heading6>What information do you have available</Heading6>}
            variant="primary"
            iconSize="md"
            isOpen={accordion2}
            setIsOpen={(param) => {
              setAccordion2(param);
            }}
          >
            <div className="radioContainer">
              {/* {transactionType !== "Client charged paid sick leave"
              ? searchContainer()
              : sickLeaveContainer()} */}
              {searchContainer()}
            </div>
          </Accordion>
        ) : null}
        {searchValue ? (
          <Accordion
            isRounded
            size="small"
            title={<Heading6>Type the {dynamicTitle("value")}</Heading6>}
            variant="primary"
            iconSize="md"
            isOpen={accordion3}
            setIsOpen={(param) => {
              setAccordion3(param);
            }}
          >
            {dynamicTitle("key") === "startID" ? (
              <div className="radioContainer">
                <Input
                  type="text"
                  labelText="Start ID"
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                  value={searchQuery}
                />
              </div>
            ) : null}

            {dynamicTitle("key") === "jobID" ? (
              <div className="radioContainer">
                <Input
                  type="text"
                  labelText="Job Number"
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                  value={searchQuery}
                />
              </div>
            ) : null}

            {dynamicTitle("key") === "vmsID" ? (
              <div className="radioContainer">
                <Input
                  type="text"
                  labelText="VMS ID"
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                  value={searchQuery}
                />
              </div>
            ) : null}
            {dynamicTitle("key") === "candidateName" ? (
              <div className="radioContainer">
                <Input
                  type="text"
                  labelText="First Name"
                  onChange={(e) => {
                    setFname(e.target.value);
                  }}
                  value={fname}
                />
                <Input
                  type="text"
                  labelText="Last Name"
                  onChange={(e) => {
                    setLname(e.target.value);
                  }}
                  value={lname}
                />
              </div>
            ) : null}

            {dynamicTitle("key") === "clientName" ? (
              <div className="radioContainer">
                <Input
                  type="text"
                  labelText="Client Name"
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                  value={searchQuery}
                />
              </div>
            ) : null}
          </Accordion>
        ) : null}

        <Button
          disabled={
            searchValue === "Candidate Name"
              ? !(searchValue && transactionType && (fname || lname))
              : !(searchValue && transactionType && searchQuery)
          }
          size="lg"
          variant="action"
          onClick={() => {
            saveDatatoStore();
          }}
        >
          Search
        </Button>
      </LayoutItem>
    </Container>
  );
};

export default TransactionType;
