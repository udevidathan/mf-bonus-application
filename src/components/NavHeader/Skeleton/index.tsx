import { ReactSkeleton, Icons, Icon, Button } from "mf-core-library-v2";
import React from "react";

import "../_nav-header.scss";

const NavHeaderSkeleton: React.FC = () => (
  <header className="c-nav_header">
    <div className="cursor-pointer" role="presentation">
      <Icons name={Icon.MBO_LOGO} height={48} width={120} />
    </div>
    <div>
      <div className="d-inline-flex align-items-center">
        <span>
          <ReactSkeleton width={30} height={12} />{" "}
        </span>
        <strong className="ml-4">
          <ReactSkeleton width={100} height={12} />
        </strong>
        <Button customClassName="btn-unstyled">
          <strong>
            <ReactSkeleton width={30} height={12} />
          </strong>
        </Button>
      </div>
    </div>
  </header>
);

export default NavHeaderSkeleton;
