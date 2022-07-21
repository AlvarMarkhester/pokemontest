import React from "react";

import Progress from "react-progressbar";

const ProgressBar = (props) => {
  // console.log(props);
  // console.log("progressbar is called");
  return (
    <div className="progress-bar">
      {" "}
      {/* <div>progrees bar</div> */}
      <Progress completed={props.completed} />
    </div>
  );
};

export default ProgressBar;
