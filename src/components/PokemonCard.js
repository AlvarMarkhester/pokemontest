import React, { useReducer, useState } from "react";
import ProgressBar from "./ProgressBar";

const PokemonCard = ({ id, image, name, type }) => {
  const [hovered, setHovered] = useState(false);
  const [pd, setPd] = useState([]);

  const style = type + " thumb-container";
  // console.log(style + "hovered");
  const getStats = async () => {
    console.log("we are here");
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const detailedStats = await res.json();
    setPd(detailedStats.stats);
    setHovered(true);
  };
  console.log(pd);
  return (
    <>
      {!hovered ? (
        <div
          className={style}
          onMouseEnter={getStats}
          onMouseLeave={() => setHovered(false)}
        >
          <img src={image} alt={name} />

          <div className="detail-wrapper">
            <div>
              <small>#0{id}</small>
            </div>

            <div>
              <h3>{name}</h3>
              <h3>{type}</h3>
            </div>
          </div>
        </div>
      ) : (
        <div className={style + "hovered"}>
          <div
            className={style}
            onMouseEnter={getStats}
            onMouseLeave={() => setHovered(false)}
          >
            {pd.map((stats, i) => (
              <div className="detail-wrapper">
                <span>{stats.stat.name}</span>
                {/* {stats.base_start} */}
                <ProgressBar completed={Number(stats.base_stat)} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
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
