import { Link, Input } from "mf-core-library-v2";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

// import { useState } from "react";
interface DatePickerTargetProps {
  callback: React.Dispatch<React.SetStateAction<string | null>>;
  placeHolderText?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  testId?: string;
}

const DatePickerTarget: React.FC<DatePickerTargetProps> = ({
  callback,
  placeHolderText = "",
  inputRef,
  testId = "calendar",
}) => {
  const [datePickerVisibility, setDatePickerVisibility] =
    useState<boolean>(false);

  const [selected, setSelected] = useState<string | null>();

  useEffect(() => {
    document.body.addEventListener("click", closeCalendar);

    return () => {
      document.removeEventListener("click", closeCalendar);
    };
  }, []);

  const closeCalendar = (event: MouseEvent): void => {
    const targetElement = event.target as Element;

    const classNames = targetElement.className
      ? targetElement.className.toString().split(" ")
      : null;

    const idElement = targetElement.id;

    // const allowedElements = [
    //   "rdp-nav_button_next",
    //   "rdp-nav_button_previous",
    //   "rdp-day",
    //   "SVGAnimatedString]",
    //   "rdp-nav_button",
    //   "rdp-button",
    // ];

    if (
      idElement !== "date-picker-element" &&
      !classNames?.includes("rdp-day") &&
      !classNames?.includes("SVGAnimatedString]") &&
      !classNames?.includes("rdp-nav_button_next") &&
      !classNames?.includes("rdp-nav_button_previous") &&
      !classNames?.includes("rdp-day")
    ) {
      setDatePickerVisibility(false);
    }
  };

  return (
    <div className="v2 stack">
      <Input
        labelText={placeHolderText}
        type="text"
        value={selected || ""}
        onChange={() => {}}
        onFocus={() => setDatePickerVisibility(true)}
        inputRef={inputRef}
        testId={testId}
        id={"date-picker-element"}
        aria-autocomplete="none"
      />
      {datePickerVisibility ? (
        <DayPicker
          mode="single"
          // selected={selected}
          onSelect={(date) => {
            console.log("select", date?.toDateString());
            setSelected(moment(date).format("DD/MM/YYYY"));
            callback(moment(date).format("DD/MM/YYYY"));
          }}
          footer={
            <div>
              <Link
                variant="action"
                menuLink
                onClick={() => setDatePickerVisibility(false)}
              >
                Cancel
              </Link>
            </div>
          }
        />
      ) : null}
    </div>
  );
};

export default DatePickerTarget;
