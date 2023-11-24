import './App.css';
import { useState } from 'react';

function App() {
  const [pokeSearh, setPokeSearch] = useState("")
  const [data, setData] = useState ("");
  const [pokePhoto, setPokePhoto] = useState("");

  const handleOnChange = (e) => {
    e.preventDefault();
    setPokeSearch(e.target.value);
  };

  const fetchpokemon = async (pokeSearh) => {
    try {
      const APIResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokeSearh}`
      )
      const dataAPI = await APIResponse.json();
      setData(dataAPI);
    } catch(err) {
      console.log(err);
    }
  };
  
  let pokemonImage = "";
  let pokeNome = ""
  let pokeAttack = '';
  let pokeDefense = '';
  let pokeType = '';

  if (data) {
    pokemonImage = 
    data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
    pokeNome = data["species"]["name"];
    pokeAttack = data.stats[1].base_stat; 
    pokeDefense = data.stats[2].base_stat; 
    pokeType = data.types[0].type.name; // First type
  }

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <main className='h-screen w-screen bg-gradient-to-b from-green-200 to-green-400 flex justify-center items-center flex-col'>
      <section className='bg-white w-96 h-96 rounded-lg relatve'>
        <h1 className='text-center font-bold mt-5 text-2x1 text-black'>
          {capitalizeFirstLetter(pokeNome)}
        </h1>
        <img className='absolute bottom-[22%] left-[53%] transform -translate-x-[63%] -translate-y-[20%] h-[38%]'
        src={pokemonImage}
        alt=""
        >
        </img>

        <div className='text-center mt-1'>
          <div className='flex justify-center gap-4'>
            <p>Ataque: {pokeAttack}</p>
            <p>Defesa: {pokeDefense}</p>
            <p>Tipo: {capitalizeFirstLetter(pokeType)}</p>
          </div>
        </div>

      </section>
      <div className='flex gap-5 mt-2'>
        <input 
        className='bg-white rounded-md'
        onChange={handleOnChange}
        placeholder='Enter Pokemon name'>         
        </input>
        <button className='bg-blue-500 rounded-md px-4 py-2' onClick={() => fetchpokemon(pokeSearh)}>Procurar</button>
      </div>
    </main>
  );
}

export default App;
