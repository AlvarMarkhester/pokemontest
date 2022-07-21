import React, { useReducer, useState } from "react";
import ProgressBar from "./ProgressBar";

const PokemonCard = ({ id, image, name, type }) => {
  const [hovered, setHovered] = useState(false);
  const [pd, setPd] = useState([]);

  const style = type + " thumb-container";
  const getStats = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const detailedStats = await res.json();
    setPd(detailedStats.stats);
    setHovered(true);
  };
  return (
    <>
      <div
        className={style}
        onMouseEnter={getStats}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="number"></div>
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
        <div>
          {hovered &&
            pd.map((stats, i) => {
              {
                <div>
                  <h1>{stats.stat.name}</h1>
                  <h1>hello</h1>
                  <ProgressBar completed={stats.base_start} />
                </div>;
              }
            })}
        </div>
      </div>
    </>
  );
};

export default PokemonCard;
