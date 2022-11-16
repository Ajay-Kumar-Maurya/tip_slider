import React from "react";
import Tooltip from "rc-tooltip";

const Tip = () => {
  return (
    <div className="m-5">
      <Tooltip
        placement="top"
        trigger={["hover"]}
        overlay={<span>tooltip</span>}
      >
        <h1>Hover on Me</h1>
      </Tooltip>
    </div>
  );
};

export default Tip;
