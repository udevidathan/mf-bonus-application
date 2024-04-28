import { Label, LabelItem, ListItem, ReactSkeleton } from "mf-core-library-v2";
import React from "react";

export const ListItemSkeleton: React.FC = () => {
  return (
    <ListItem customClassName="divide-x">
      <>
        <div style={{ flexBasis: "150px" }}>
          <LabelItem
            block
            name={
              <Label>
                <ReactSkeleton width={156} height={18} />
              </Label>
            }
            value={
              <Label>
                <ReactSkeleton width={156} height={18} />
              </Label>
            }
          />
        </div>

        <div style={{ flexBasis: "350px" }}>
          <LabelItem
            block
            name={
              <Label>
                <ReactSkeleton width={156} height={18} />
              </Label>
            }
            value={
              <Label>
                <ReactSkeleton width={300} height={18} />
              </Label>
            }
          />
        </div>

        <div style={{ flexBasis: "180px" }}>
          <LabelItem
            block
            name={
              <Label>
                <ReactSkeleton width={156} height={18} />
              </Label>
            }
            value={
              <Label>
                <ReactSkeleton width={156} height={18} />{" "}
              </Label>
            }
          />
        </div>

        <div style={{ flexBasis: "180px" }}>
          <LabelItem
            block
            name={
              <Label>
                <ReactSkeleton width={156} height={18} />
              </Label>
            }
            value={
              <Label>
                <ReactSkeleton width={156} height={18} />
              </Label>
            }
          />
        </div>

        <div style={{ flexBasis: "180px" }}>
          <LabelItem
            block
            name={
              <Label>
                <ReactSkeleton width={156} height={18} />
              </Label>
            }
            value={
              <Label>
                <ReactSkeleton width={156} height={18} />
              </Label>
            }
          />
        </div>
      </>
    </ListItem>
  );
};
