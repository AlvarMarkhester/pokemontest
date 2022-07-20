import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import PokemonCard from "./components/PokemonCard";
import ProgressBar from "./components/ProgressBar";
import "./index.css";

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [load, setLoad] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=50&offset=0"
  );
  const [search, setSearch] = useState("");

  const getAllPokemons = async () => {
    const res = await fetch(load);
    const data = await res.json();
    // console.log(data);
    setLoad(data.next);

    function getPokemonObj(results) {
      results.forEach(async (pokemon) => {
        console.log(pokemon.name);
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

  const inputHandler = (e) => {
    setSearch(e.target.value);
    e.preventDeault();
  };

  const filteredPokemons = allPokemons.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <Header />
      <div className="app-container">
        <form>
          <input
            className="pokemon-input"
            type="text"
            placeholder="Search a pokemon"
            onChange={inputHandler}
          />
        </form>
        <div className="pokemon-container">
          <h1>Pokemons</h1>
          {/* <ProgressBar /> */}
          <div className="all-container">
            {filteredPokemons &&
              filteredPokemons.map((pokemon, index) => (
                <PokemonCard
                  key={index}
                  // id={pokemon.id}
                  id={index + 1}
                  image={pokemon.sprites.other.dream_world.front_default}
                  name={pokemon.name}
                  type={pokemon.types[0].type.name}
                />
              ))}
            <button className="load-more" onClick={() => getAllPokemons()}>
              Load More
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
