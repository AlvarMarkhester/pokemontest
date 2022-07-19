import { useEffect, useState } from "react";
import "./App.css";
import PokemonCard from "./components/PokemonCard";
import "./index.css";

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [load, setLoad] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=50&offset=0"
  );

  const getAllPokemons = async () => {
    const res = await fetch(load);
    const data = await res.json();
    // console.log(data);
    setLoad(data.next);

    function getPokemonObj(results) {
      results.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const individualResult = await res.json();
        console.log(individualResult);
        setAllPokemons((currentList) => [...currentList, individualResult]);
      });
    }
    getPokemonObj(data.results);
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <div className="app-container">
      <h1>Pokemons</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map((pokemon, index) => (
            <PokemonCard
              key={index}
              id={pokemon.id}
              image={pokemon.sprites.other.dream_world.front_default}
              name={pokemon.name}
              type={pokemon.types[0].type.name}
            />
          ))}
          <button className="load-more">Load More</button>
        </div>
      </div>
    </div>
  );
}

export default App;
