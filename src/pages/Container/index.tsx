import { Content, HelpCenter } from "mf-core-library-v2";
import React from "react";

interface ContainerItemProps {
  children?: React.ReactNode;
}

export const ContainerItem: React.FC<ContainerItemProps> = ({ children }) => {
  return (
    <Content app="settings" footerHeight={64}>
      <main className="content__main">
        <div>{children}</div>
        <div className="help__center">
          <HelpCenter desc="Questions? go to" link="MBO Help Center" />
        </div>
      </main>
    </Content>
  );
};

export default ContainerItem;
