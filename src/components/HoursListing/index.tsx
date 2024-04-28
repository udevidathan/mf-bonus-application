import {
  Label,
  LabelItem,
  ListItem,
  ListItems,
  Link,
} from "mf-core-library-v2";
import React from "react";
interface IProps {
  showActionIcon?: boolean;
  hoursData: hoursDataObj[];
  setHours?: React.Dispatch<React.SetStateAction<hoursDataObj[]>>;
}

const HoursData: React.FC<IProps> = ({
  showActionIcon = false,
  hoursData,
  setHours,
}) => {
  const spliceHours = (index: number): void => {
    const oldHoursArray = [...hoursData];

    oldHoursArray.splice(index, 1);

    setHours && setHours(oldHoursArray);
  };

  const hoursDataProps = (prop: boolean, index: number): object => {
    return {
      ...(prop && {
        actionMenuElement: (
          <Link
            onClick={() => {
              spliceHours(index);
            }}
            menuLink
          >
            Remove
          </Link>
        ),
      }),
    };
  };

  return (
    <ListItems actionIcon={showActionIcon}>
      {hoursData &&
        hoursData.map((data, index) => {
          return (
            <ListItem
              actionIcon={showActionIcon}
              {...hoursDataProps(showActionIcon, index)}
              key={index}
            >
              <div className="flex-basis-40">
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
              <div className="flex-basis-40">
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
    </ListItems>
  );
};

export default HoursData;
