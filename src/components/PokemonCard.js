import React from "react";

const PokemonCard = ({ id, image, name, type }) => {
  const style = type + " thumb-container";
  return (
    <div className={style}>
      <div className="number"></div>
      <img src={image} alt={name} />
      <div className="detail-wrapper">
        <div>
          <small>#0{id}</small>
        </div>

        <h3>{name}</h3>
        <h3>Type: {type}</h3>
      </div>
    </div>
  );
};

export default PokemonCard;
