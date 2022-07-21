import React from "react";

import Progress from "react-progressbar";

const ProgressBar = (props) => {
  return (
    <div className="progress-bar">
      <Progress completed={props.completed} />
    </div>
  );
};

export default ProgressBar;
