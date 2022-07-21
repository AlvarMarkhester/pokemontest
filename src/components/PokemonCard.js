import React, { useReducer, useState } from "react";
import ProgressBar from "./ProgressBar";

const PokemonCard = ({ id, image, name, type, stats }) => {
  const [hovered, setHovered] = useState(false);

  const style = type + " thumb-container";
  // console.log(style + "hovered");
  const setHover = () => {
    setHovered(true);
  };
  return (
    <div
      className={style}
      onMouseEnter={setHover}
      onMouseLeave={() => setHovered(false)}
    >
      {!hovered ? (

        <><img src={image} alt={name} />
        <div className="detail-wrapper">
          <div>
            <small>#0{id}</small>
          </div>

          <div>
            <h3>{name}</h3>
            <h3>{type}</h3>
          </div>
        </div>
        </>
      ) : (
        stats.map((stats) => (
          <div className="detail-wrapper">
            <span>{stats.stat.name}</span>
            {/* {stats.base_start} */}
            <ProgressBar completed={Number(stats.base_stat)} />
          </div>
        ))
      )}
    </div>
  );
};

export default PokemonCard;
{
  /* <div>
{hovered && (
  <div className={style}>
    {pd.map((stats, i) => (
      <div className="detail-wrapper">
        <span>{stats.stat.name}</span>
        {/* {stats.base_start} */
}
/*<ProgressBar completed={Number(stats.base_stat)} />*/
//       </div>
//     ))}
//   </div>
// )}
// </div>
