import { useState } from 'react';
import './App.css';
import axios from 'axios';

export default function App() {

  const [monName,setMonName] = useState(" ");
  const [monTyped,setMonTyped] = useState(false);
  const [monInfo,setMonInfo] = useState({
    name: "",
    passive_ability: "",
    height: "",
    weight: "",
    img_front_normal: "",
    img_front_shiny: "",
    img_back_normal: "",
    img_back_shiny: "",
    artwork: "",
    hp: "",
    attack: "",
    defense: "",
    special_attack: "",
    special_defense: "",
    speed: ""
  });

  function searchMon(){
    setMonTyped(true);

    axios.get(`https://pokeapi.co/api/v2/pokemon/${monName.toLowerCase()}`)
      .then((response)=>{
        let res = response.data;

        setMonInfo({
          name: monName,
          passive_ability: res.abilities[0].ability.name || "No Passive Ability",
          height: res.height,
          weight: res.weight,
          img_front_normal: res.sprites.front_default,
          img_front_shiny: res.sprites.front_shiny,
          img_back_normal: res.sprites.back_default,
          img_back_shiny: res.sprites.back_shiny,
          artwork: res.sprites.other["official-artwork"].front_default,
          hp: res.stats[0].base_stat,
          attack: res.stats[1].base_stat,
          defense: res.stats[2].base_stat,
          special_attack: res.stats[3].base_stat,
          special_defense: res.stats[4].base_stat,
          speed: res.stats[5].base_stat
        })
      })
      .catch((err)=>{
        console.log(err);
      })
  }

  return (
    <div className="App">
      <div className="title-section">
        <h1>Pokemon Stats!</h1>

        <input type="text" onChange={(event)=>{
          setMonName(event.target.value)
        }}/>
        <button onClick={searchMon}>Search</button>
      </div>

      {monTyped && <div className='display-section'>
          <div className='img-container'>

            <div className='img-normal'>
              <p>{monName}</p>
              <div className='img-card'>
                <img src={monInfo.img_front_normal} className='img-1'/>
              </div>
              <div className='img-card'>
                <img src={monInfo.img_back_normal} className='img-2'/>
              </div>
            </div>

            <div className='img-normal'>
              <p>Shiny {monName}</p>
              <div className='img-card'>
                <img src={monInfo.img_front_shiny} className='img-3'/>
              </div>
              <div className='img-card'>
                <img src={monInfo.img_back_shiny} className='img-4'/>
              </div>
            </div>

            <div className='img-card'>
              <p>Official Artwork</p>
              <img className='img-5' src={monInfo.artwork}/>
            </div>
          </div>
        </div>}
    </div>
  );
}
