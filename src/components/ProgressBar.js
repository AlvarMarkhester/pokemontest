import React from "react";

import Progress from "react-progressbar";

const ProgressBar = (props) => {
  console.log(props);
  console.log("progressbar is called");
  return (
    <div>
      {" "}
      <div>progrees bar</div>
      <Progress completed={props.completed} />
    </div>
    // <div>
    //   <div className="number"></div>
    //   {/* <img src={image} alt={name} /> */}
    //   <div className="detail-wrapper">
    //     <div>{/* <small>#0{id}</small> */}</div>
    //     <Progress completed={55} />
    //     {/* <h3>{name}</h3>
    //   <h3>Type: {type}</h3> */}
    //   </div>
    // </div>
  );
};

export default ProgressBar;
