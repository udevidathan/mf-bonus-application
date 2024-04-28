import {
  BodyText,
  useIsMobile,
  Content,
  Link,
  Heading6,
} from "mf-core-library-v2";
import React from "react";
import { useParams } from "react-router-dom";

import HoursData from "../../components/HoursListing";
import NewTransaction from "../../components/NewTransaction";
import { LayoutItem } from "../../layout/layout";
import { useSearchStore } from "../../stores/useSearchStore";

import "./confirm.scss";

export const PostConfirm: React.FC = () => {
  const { jobDivaId } = useParams();
  const { transactionType, record, modifiedRecod } = useSearchStore();

  const pslValue =
    decodeURI(transactionType || "").toLowerCase() ===
    "client charged paid sick leave";

  const { isMobile } = useIsMobile("");

  const formatHoursData = (
    data: sickLeaveData[] | undefined
  ): hoursDataObj[] => {
    const returnData: Array<{ date: string; hours: string }> = [];

    data &&
      data.forEach((element) => {
        returnData.push({
          date: element.date.raw as string,
          hours: element.hours as string,
        });
      });

    return returnData;
  };

  return (
    <Content app="admin">
      <NewTransaction text={"Start a new transaction"} />
      <LayoutItem
        layoutIdentifier={`listing-mobile`}
        className={`item-gap padding-all ${!isMobile ? `width-30` : ``}`}
      >
        <div className="v2 repel">
          <BodyText>Status</BodyText>
          <BodyText color="dark" strong>
            Completed
          </BodyText>
        </div>
        <div className="v2 repel">
          <BodyText>Type of transaction</BodyText>
          <BodyText color="dark" strong>
            {transactionType || "-"}
          </BodyText>
        </div>
        <div className="v2 repel">
          <BodyText>Candidate name</BodyText>
          <BodyText color="dark" strong>
            {`${record?.provider?.firstName || ""} 
                          , 
                          ${record?.provider?.lastName || ""}` || "--"}
          </BodyText>
        </div>
        <div className="v2 repel">
          <BodyText>Client name</BodyText>
          <BodyText color="dark" strong>
            {record?.buyer?.name || "--"}
          </BodyText>
        </div>
        {!pslValue ? (
          <div className="v2 repel">
            <BodyText>Pay amount</BodyText>
            <BodyText color="dark" strong>
              {(modifiedRecod as saveNonPSL).payAmount?.raw || "--"}
            </BodyText>
          </div>
        ) : null}
        {!pslValue ? (
          <div className="v2 repel">
            <BodyText>Bill amount</BodyText>
            <BodyText color="dark" strong>
              {(modifiedRecod as saveNonPSL).billAmount?.raw || "--"}
            </BodyText>
          </div>
        ) : null}
        {!pslValue ? (
          <div className="v2 repel">
            <BodyText>Effective date</BodyText>
            <BodyText color="dark" strong>
              {(modifiedRecod as saveNonPSL).effectiveDate?.raw || "--"}
            </BodyText>
          </div>
        ) : null}
        <div className="v2 repel">
          <BodyText>Transaction record</BodyText>
          <BodyText color="dark" strong>
            <Link
              external
              href={`https://www1.jobdiva.com/employers/myprofit/showemployeeinvoice.jsp?invoiceid=${
                jobDivaId || ""
              }`}
            >
              {jobDivaId}
            </Link>
          </BodyText>
        </div>
        {pslValue ? (
          <div>
            <Heading6>Hours data</Heading6>
            <HoursData
              showActionIcon={false}
              hoursData={formatHoursData(
                (modifiedRecod as savePSL).paidSickLeave
              )}
            />
          </div>
        ) : null}
      </LayoutItem>
    </Content>
  );
};
