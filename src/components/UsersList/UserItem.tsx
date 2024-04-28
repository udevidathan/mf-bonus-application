import {
  Label,
  LabelItem,
  ListItem,
  // MenuList,
  // MenuListItem,
  Button,
  useIsMobile,
  Link,
} from "mf-core-library-v2";
import React from "react";
import { useNavigate } from "react-router-dom";

// import { LayoutItem } from "../../layout/layout";
import { useSearchStore } from "../../stores/useSearchStore";
// import { AdminContext } from "../../context/AdminContext";

export interface ListProps {
  name?: string;
  billRate: CurrentPayRateOrCurrentBillRate;
  payRate: CurrentPayRateOrCurrentBillRate;
  clientName: Buyer;
  jobDivaId: string;
  testId?: string;
  record: ResultsEntity;
  transactionType?: string;
  jobTitle?: string;
  candidateId?: Array<{
    system?: string;
    type?: string;
    url?: string;
    value?: string;
  }> | null;
}

export const UserItem: React.FC<ListProps> = ({
  name = "",
  billRate,
  payRate,
  clientName,
  jobDivaId,
  testId = "",
  record,
  jobTitle = "",
  transactionType = "",
  candidateId = null,
}) => {
  const navigate = useNavigate();
  const { updateRecord } = useSearchStore();
  const { isMobile } = useIsMobile("");

  console.log(candidateId, "candidateId");

  const modifyData = (): void => {
    updateRecord(record);
    navigate(`/modifyscreen/${jobDivaId}/${encodeURI(transactionType)}`);
  };

  return (
    <>
      <ListItem testId={testId}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <div style={{ flexBasis: "200px" }}>
            <LabelItem
              block
              name={<Label>Name</Label>}
              value={
                <Label variant="dark">
                  {candidateId ? (
                    <Link href={candidateId[0].url} external>
                      {name || "--"}
                    </Link>
                  ) : (
                    name
                  )}
                </Label>
              }
              testId={`${testId || ""}-name`}
            />
          </div>

          {!isMobile ? (
            <>
              <div style={{ flexBasis: "200px" }}>
                <LabelItem
                  block
                  name={<Label>Bill rate</Label>}
                  value={
                    <Label variant="dark" ellipsis>
                      {billRate?.value || "--"}
                    </Label>
                  }
                  testId={`${testId || ""}-bill-rate`}
                />
              </div>

              <div style={{ flexBasis: "200px" }}>
                <LabelItem
                  block
                  name={<Label>Pay rate</Label>}
                  value={<Label variant="dark">{payRate?.value || "--"}</Label>}
                  testId={`${testId || ""}-pay-rate`}
                />
              </div>
            </>
          ) : null}

          <div style={{ flexBasis: "200px" }}>
            <LabelItem
              block
              name={<Label>Job title</Label>}
              value={<Label variant="dark">{jobTitle || "--"}</Label>}
              testId={`${testId || ""}-jobtitle`}
            />
          </div>

          <div style={{ flexBasis: "200px" }}>
            <LabelItem
              block
              name={<Label>Client name</Label>}
              value={<Label variant="dark"> {clientName?.name || "--"}</Label>}
              testId={`${testId || ""}-clientname`}
            />
          </div>
          <div style={{ flexBasis: "200px" }}>
            <Button
              size="md"
              variant="link"
              onClick={() => {
                modifyData();
              }}
            >
              Select
            </Button>
          </div>
        </div>
      </ListItem>
    </>
  );
};
