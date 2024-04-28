import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import {
  Content,
  Heading3,
  Heading6,
  Label,
  Radio,
  LabelItem,
  Input,
  Button,
  ListItem,
  BottomSheetV2,
  Heading5,
  Dialog,
  useIsMobile,
} from "mf-core-library-v2";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// import useSaveDiscretionary from "../../hooks/useSaveDiscretionary";

import Api from "../../API";
import BonusApplication from "../../API/BonusApplication";
import DatePickerTarget from "../../components/Datepicker";
import HoursData from "../../components/HoursListing";
// import ErrorContainer from "../../components/ErrorContainer";
import NewTransaction from "../../components/NewTransaction";
import { LayoutItem } from "../../layout/layout";
import { nonPSLPayload, pslPayload } from "../../payloads";
import { useErrorStore } from "../../stores/useErrorStore";
import { useSearchStore } from "../../stores/useSearchStore";

import "./modify.scss";

export const Modify: React.FC = () => {
  const { jobDivaId, transactiontype } = useParams();
  const { saveModifiedRecord, record } = useSearchStore();
  const { updateErrorResults } = useErrorStore();
  const { isMobile } = useIsMobile("");

  console.log(isMobile, "isMobile");
  const [paymentType, setPaymentType] = useState<string | null>("");
  const [transactionAmount, setTransactionAmount] = useState<string | null>("");
  const [effectiVeDate, setEffectiveDate] = useState<string | null>("");
  const [startDate, setStartDate] = React.useState<string | null>("");
  const [hours, setHours] = React.useState<string | null>("");
  const [hoursData, setHoursData] = React.useState<hoursDataObj[]>([]);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [wait, setWait] = React.useState<string | boolean>(false);
  const [hourErrMsg, setHourErrMsg] = useState<string>("");
  const navigate = useNavigate();

  const pslValue =
    decodeURI(transactiontype || "").toLowerCase() ===
    "client charged paid sick leave";

  const saveHours = (): void => {
    setHoursData((oldArray) => [...oldArray, { date: startDate, hours }]);
  };

  const saveModifiedData = (
    data: saveNonPSL | savePSL | null
  ): Promise<AxiosResponse> => {
    const modifyType = decodeURI(transactiontype || "").toLowerCase();

    setWait("Please wait");
    let request;

    if (modifyType === "client charged paid sick leave") {
      request = BonusApplication.savePSLForProcessing(data);
    } else if (modifyType === "discretory bonus") {
      request = BonusApplication.saveDiscretionary(data);
    } else if (modifyType === "non discretory bonus") {
      request = BonusApplication.saveNonDiscretionary(data);
    } else {
      request = BonusApplication.saveAdjustment(data);
    }

    return Api.performRequestMutate(request);
  };

  const saveMutation = useMutation({
    mutationFn: saveModifiedData,
    onMutate: (variables) => {
      console.log(variables);
      // A mutation is about to happen!

      // Optionally return a context containing data to use when for example rolling back
      return { id: 1 };
    },
    onError: (error, variables, context) => {
      // An error happened!
      console.log(error, variables, context);

      setWait(false);
    },
    onSuccess: (data) => {
      console.log(data.data.errors);

      if (data.data.errors.length > 0) {
        updateErrorResults(data.data.errors);
        setWait(false);
        setOpenDialog(false);
      } else {
        // no error
        const invId: string = Array.isArray(data?.data?.data)
          ? data?.data?.data[0].invoiceId
          : data?.data?.data.invoiceId;

        setWait(false);
        setOpenDialog(false);

        setTimeout(() => {
          navigate(`/post-confirm/${invId}`);
        }, 300);
      }
    },
    onSettled: () => {
      setWait(false);
      setOpenDialog(false);
    },
  });

  const handleRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPaymentType(event.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const validInputRegex = /^\d+$/;

    if (validInputRegex.test(value)) {
      setTransactionAmount(value);
    }
  };

  const formattedHoursData = (): sickLeaveData[] =>
    hoursData.map((data) => {
      return {
        hours: data?.hours || "",
        date: {
          culture: "en-US",
          raw: data?.date?.toString() || "",
        },
      };
    });

  const save = (): void => {
    const jid = jobDivaId || "";

    const payload = pslValue
      ? pslPayload(jid, formattedHoursData(), "123", "vatsal@mbopartners.com")
      : nonPSLPayload(
          paymentType,
          transactionAmount,
          effectiVeDate,
          jid,
          "123",
          "vatsal@mbopartners.com"
        );

    console.log(payload);
    saveModifiedRecord(payload);
    saveMutation.mutate(payload);
  };

  const sickLeave = (): React.ReactNode => {
    return (
      <>
        <LayoutItem className="item-gap" layoutIdentifier="listing-hours">
          <div>
            <Label>Date</Label>
            <div>
              <DatePickerTarget callback={setStartDate} />
            </div>
          </div>
          <div>
            <Label>Hours</Label>
            <div>
              <Input
                type="text"
                // placeholder="Hours"
                labelText="Hours"
                errorMessage={hourErrMsg}
                onChange={(e) => {
                  if (
                    parseInt(e.target.value) >= 0 &&
                    parseInt(e.target.value) <= 24
                  ) {
                    setHours(e.target.value);
                  } else {
                    setHourErrMsg("Please select hours between 0 and 24");
                  }
                }}
                value={hours || ""}
              />
            </div>
          </div>
          <div style={{ margin: "auto 0" }}>
            <Button
              size="md"
              variant="action"
              onClick={() => {
                saveHours();
              }}
            >
              Save hours
            </Button>
          </div>
        </LayoutItem>
        <div style={{ height: "300px", overflowY: "auto" }}>
          {/* <ListItems actionIcon={true}>
            {hoursData.map((data, index) => {
              return (
                <ListItem
                  actionMenuElement={
                    <Link
                      onClick={() => {
                        spliceHours(index);
                      }}
                      menuLink
                    >
                      Remove
                    </Link>
                  }
                  key={index}
                >
                  <div className="flex-basis-25">
                    <LabelItem
                      block
                      name={<Label variant="primary__light">Date</Label>}
                      value={
                        <Label variant="dark">
                          {data.date ? data.date.toString() : ""}
                        </Label>
                      }
                      testId={`date-${index}`}
                    />
                  </div>
                  <div className="flex-basis-25">
                    <LabelItem
                      block
                      name={<Label variant="primary__light">Hours</Label>}
                      value={<Label variant="dark">{data.hours}</Label>}
                      testId={`date-${index}`}
                    />
                  </div>
                </ListItem>
              );
            })}
          </ListItems> */}
          <HoursData
            showActionIcon={true}
            hoursData={hoursData}
            setHours={setHoursData}
          />
        </div>
      </>
    );
  };

  const nonSickLeave = (): React.ReactNode => {
    return (
      <>
        <Heading5>Select an amount type and enter the value</Heading5>

        <LayoutItem
          className={`item-gap ${!isMobile ? `width-30` : ``}`}
          layoutIdentifier={`listing-mobile`}
        >
          <div className="v2 cluster">
            <Heading6>Amount type</Heading6>

            <Radio
              onChange={handleRadioChange}
              checked={paymentType === "Pay"}
              value={"Pay"}
              disabled={false}
              radioSize={"sm"}
            />
            <Radio
              onChange={handleRadioChange}
              checked={paymentType === "Bill"}
              value={"Bill"}
              disabled={false}
              radioSize={"sm"}
            />
          </div>
          <div>
            <Heading6>Transaction amount {paymentType?.toLowerCase()}</Heading6>
            <Input
              type="text"
              labelText="Transaction amount"
              testId="transaction-amount"
              value={transactionAmount || ""}
              onChange={(e) => handleAmountChange(e)}
            />
          </div>
          <div>
            <Heading6>Select an Effective date</Heading6>

            <DatePickerTarget
              callback={setEffectiveDate}
              placeHolderText="Effective date"
              testId="effective-date"
            />
          </div>
        </LayoutItem>
      </>
    );
  };

  const renderNonPSLItems = (): React.ReactNode => {
    return (
      <ListItem testId={`nonpsl_0`} key={0}>
        <div>
          <LabelItem
            block
            name={<Label>Type of transaction</Label>}
            value={<Label variant="dark">{transactiontype || "--"}</Label>}
            testId={`ttype0`}
          />
        </div>
        <div>
          <LabelItem
            block
            name={<Label>Candidate name</Label>}
            value={
              <Label variant="dark">
                {`${record?.provider?.firstName || ""} 
                    , 
                    ${record?.provider?.lastName || ""}` || "--"}
              </Label>
            }
            testId={`name-0`}
          />
        </div>
        <div>
          <LabelItem
            block
            name={<Label>Client name</Label>}
            value={<Label variant="dark">{record?.buyer?.name || "--"}</Label>}
            testId={`clientname0`}
          />
        </div>
        <div>
          <LabelItem
            block
            name={<Label>Pay amount</Label>}
            value={
              <Label variant="dark">
                {paymentType === "Pay" ? transactionAmount : "-"}
              </Label>
            }
            testId={`payamount0`}
          />
        </div>
        <div>
          <LabelItem
            block
            name={<Label>Bill amount</Label>}
            value={
              <Label variant="dark">
                {paymentType === "Bill" ? transactionAmount : null}
              </Label>
            }
            testId={`bill0`}
          />
        </div>
        <div>
          <LabelItem
            block
            name={<Label>Effective date</Label>}
            value={<Label variant="dark">{effectiVeDate || ""}</Label>}
            testId={`effectivedate0`}
          />
        </div>
      </ListItem>
    );
  };

  const renderPslItems = (
    item: hoursDataObj,
    index: number
  ): React.ReactNode => {
    return (
      <>
        <div>
          <LabelItem
            block
            name={<Label>Client name</Label>}
            value={<Label variant="dark">{record?.buyer?.name || "--"}</Label>}
            testId={`name-${index}`}
          />
        </div>
        <div>
          <LabelItem
            block
            name={<Label>Candidate name</Label>}
            value={
              <Label variant="dark">
                {`${record?.provider?.firstName || ""} 
          , 
          ${record?.provider?.lastName || ""}` || "--"}
              </Label>
            }
            testId={`name-${index}`}
          />
        </div>
        <div>
          <LabelItem
            block
            name={<Label>Assignment name</Label>}
            value={<Label variant="dark">{record?.name || "--"}</Label>}
            testId={`name-${index}`}
          />
        </div>
        <div>
          <LabelItem
            block
            name={<Label>Date</Label>}
            value={<Label variant="dark"> {item?.date || "--"}</Label>}
            testId={`date-${index}`}
          />
        </div>
        <div>
          <LabelItem
            block
            name={<Label>Hours</Label>}
            value={<Label variant="dark"> {item?.hours || "--"}</Label>}
            testId={`hours-${index}`}
          />
        </div>
      </>
    );
  };

  return (
    <Content app="admin">
      <div className="admin-dashboard__container">
        <NewTransaction text={"Start a new transaction"} />
        <Heading3 color={"primary"}>Transaction details</Heading3>

        {pslValue ? sickLeave() : nonSickLeave()}
        <Button
          onClick={() => {
            setOpenDialog(true);
          }}
          size="md"
          variant="action"
          disabled={
            pslValue
              ? hoursData.length === 0
              : transactionAmount === "" || effectiVeDate === ""
          }
        >
          Submit
        </Button>
      </div>
      {isMobile ? (
        <BottomSheetV2
          title={typeof wait === "string" ? wait : "Confirm the transaction"}
          isOpen={openDialog}
          onClose={() => setOpenDialog(false)}
          isFooterVisible
          applyHandler={save}
          cancelHandler={() => setOpenDialog(false)}
        >
          <div>
            {pslValue
              ? hoursData.map((item, index) => (
                  <ListItem testId={`psl_${index || ""}`} key={index}>
                    {renderPslItems(item, index)}
                  </ListItem>
                ))
              : renderNonPSLItems()}
          </div>
        </BottomSheetV2>
      ) : (
        <Dialog
          isOpen={openDialog}
          onClose={() => setOpenDialog(false)}
          title={"Please confirm the transaction"}
          testId="dialog-confirmation"
        >
          <div className="content-popup">
            {pslValue ? (
              hoursData.map((item, index) => (
                <ListItem testId={`records${index}`} key={index}>
                  <LayoutItem layoutIdentifier={`listing-web`}>
                    {renderPslItems(item, index)}
                  </LayoutItem>
                </ListItem>
              ))
            ) : (
              <ListItem testId={`record0`}>
                <LayoutItem layoutIdentifier={`listing-web`}>
                  {renderNonPSLItems()}
                </LayoutItem>
              </ListItem>
            )}
            <Button
              onClick={() => {
                save();
              }}
              size="lg"
              variant="action"
              disabled={typeof wait === "string"}
            >
              {wait !== false ? wait : "Submit"}
            </Button>
          </div>
        </Dialog>
      )}
    </Content>
  );
};

export default Modify;
