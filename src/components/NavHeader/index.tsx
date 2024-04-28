import { useOktaAuth } from "@okta/okta-react";
import { Button, Label, MBOLogo } from "mf-core-library-v2";
import React from "react";

import "./_nav-header.scss";

const NavHeader: React.FC = () => {
  const { authState } = useOktaAuth();

  return (
    <header className="c-nav_header">
      <MBOLogo
        variant="logo"
        color="white"
        height={48}
        width={120}
        onClick={() => {}}
        id="settings-logo"
        role="image"
        tabIndex={0}
        ariaLabel="MBO partners logo"
        testId="settings-logo"
      />
      <div>
        <div className="d-inline-flex align-items-center">
          <Label size="sm">Hello,</Label>{" "}
          <Label
            size="sm"
            customClassName="strong"
            testId="settings-header-username"
          >
            {authState?.idToken?.claims.name}
          </Label>
          <Button
            onClick={() => {}}
            id="settings-logout"
            size="sm"
            testId="settings-header-button"
          >
            <strong>Log out</strong>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavHeader;
