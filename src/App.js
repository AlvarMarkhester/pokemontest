import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import "./index.css";
import PokemonCard from "./components/PokemonCard";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import ProgressBar from "./components/ProgressBar";

const clientId = process.env.REACT_CLIENT_ID;

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loading, setLoading] = useState("Loading...");
  const [user, setUser] = useState(null);
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
        // console.log(pokemon.name);
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const individualResult = await res.json();
        // console.log(individualResult);
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

  const handleLoginSuccess = (response) => {
    console.log("Login Success ", response);
    // setUser(response.profileObj);
    setUser(true);
    setLoading();
  };

  const handleLoginFailure = (error) => {
    console.log("Login Failure ", error);
    setLoading();
  };

  const handleLogoutSuccess = (response) => {
    console.log("Logout Success ", response);
    setUser(null);
  };

  const handleLogoutFailure = (error) => {
    console.log("Logout Failure ", error);
  };

  const handleRequest = () => {
    setLoading("Loading...");
  };

  const handleAutoLoadFinished = () => {
    setLoading();
  };

  return (
    <>
      <Header />
      <div className="login">
        <h2>
          Pokemon Login -{" "}
          <a href="" target="_blank" rel="noopener noreferrer"></a>
        </h2>
        {user ? (
          <div>
            <div className="name">Welcome {user.name}!</div>
            <GoogleLogout
              clientId={clientId}
              onLogoutSuccess={handleLogoutSuccess}
              onFailure={handleLogoutFailure}
            />
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>
        ) : (
          <GoogleLogin
            clientId={clientId}
            buttonText={loading}
            onSuccess={handleLoginSuccess}
            onFailure={handleLoginFailure}
            onRequest={handleRequest}
            onAutoLoadFinished={handleAutoLoadFinished}
            isSignedIn={true}
          />
        )}
      </div>

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
