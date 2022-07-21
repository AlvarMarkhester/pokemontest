import React, { useReducer, useState } from "react";
import ProgressBar from "./ProgressBar";

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "HP":
//       return {};

//     case "ATTACK":
//       return {};

//     case "DEFENSE":
//       return {};

//     case "SPECIALATTACK":
//       return {};

//     case "SPECIALDEFENSE":
//       return {};

//     case "SPEED":
//       return {};

//     default:
//       console.log("error in switch ");
//   }
// };
const PokemonCard = ({ id, image, name, type }) => {
  const [hovered, setHovered] = useState(false);
  // const [stats, setStats] = useState([{}]);
  const [pd, setPd] = useState([]);
  // const [state, dispatch] = useReducer(reducer, {
  //   hp: "",
  //   attack: "",
  //   defense: "",
  //   specialAttack: "",
  //   specialDefense: "",
  //   speed: "",
  // });
  const style = type + " thumb-container";
  // console.log(style);
  const getStats = async () => {
    // alert("hovered");
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const detailedStats = await res.json();
    setPd(detailedStats.stats);
    console.log(detailedStats);
    console.log(detailedStats.stats[0].stat.name);
    console.log(detailedStats.stats[0].base_stat);
    console.log(detailedStats.stats[1].stat.name);
    console.log(detailedStats.stats[1].base_stat);

    // setStats({
    //   Hp: detailedStats.stats[0].stat.name,
    //   attack: detailedStats.stats[1].stat.name,
    //   defense: detailedStats.stats[2].stat.name,
    //   specialAttack: detailedStats.stats[3].stat.name,
    //   specialDefense: detailedStats.stats[4].stat.name,
    //   speed: detailedStats.stats[5].stat.name,
    // });

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
              // stats[i].base_stat;
              // console.log(stats);
              {
                <div>
                  <h1>{stats.stat.name}</h1>
                  <h1>hello</h1>
                  <ProgressBar completed={stats.base_start} />
                </div>;
              }
              // console.log(i);
              // <ProgressBar completed={stats[i].base_stat} />;
            })}
        </div>
      </div>

      {/* {hovered && (
        <div>
          <ProgressBar />
        </div>
      )} */}
    </>
  );
};

export default PokemonCard;
