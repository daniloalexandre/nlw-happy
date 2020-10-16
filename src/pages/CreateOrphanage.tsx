import '../styles/pages/create-orphanage.css';

import { Map, Marker, TileLayer } from 'react-leaflet';
import React, { ChangeEvent, FormEvent, useState } from "react";

import { FiPlus } from "react-icons/fi";
import { LeafletMouseEvent } from 'leaflet';
import Sidebar from "../components/Sidebar";
import api from '../services/api';
import mapIcon from '../utils/mapIcon';
import { useHistory } from 'react-router-dom';

export default function CreateOrphanage() {
  const history = useHistory();
  const [position, setPosition] = useState({lat :0, lng : 0});
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [openOnWeekends, setOpenOnWeekends] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setpreviews] = useState<string[]>([]);

  function handleSubmit(event : FormEvent) {
    event.preventDefault();

    const data = new FormData()

    data.append("name", name);
    data.append("latitude", String(position.lat));
    data.append("longitude", String(position.lng));
    data.append("about", about);
    data.append("instructions", instructions);
    data.append("opening_hours", openingHours);
    data.append("open_on_weekend", String(openOnWeekends))
    
    images.forEach(image => data.append("images", image));

    api.post("/orphanages", data).then(res =>{

      window.alert("Cadastro Efetuado com Sucesso.");
      history.push("/app");

    }).catch(err =>{

      window.alert("Não foi possível efetuar o cadastro.");

    })


  }
  
  function handleSelectImages(event : ChangeEvent<HTMLInputElement>){
    if(!event.target.files){
      return
    }

    const selectedImages = Array.from(event.target.files)
    setImages(selectedImages);

    const selectedPreviews = selectedImages.map(image =>{
        return URL.createObjectURL(image);
    })
    setpreviews(selectedPreviews);
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar/>

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-7.242662,-35.9716054]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={(event : LeafletMouseEvent) => {
                setPosition(event.latlng);
              }}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              {position.lat !== 0 && position.lng && (
                <Marker 
                  interactive={false} 
                  icon={mapIcon} 
                  position={[
                    position.lat , 
                    position.lng]} 
                  />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name" 
                value={name} 
                onChange={(event) => {
                 setName(event.target.value);
                }} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="about" 
                maxLength={300}
                value={about} 
                onChange={(event) => {
                 setAbout(event.target.value);
                }}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previews.map((preview, index) => {
                  return (
                    <img key={index} src={preview} alt={name}/>
                  )
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
                
              </div>
              <input 
                multiple 
                type="file" 
                id="image[]"
                onChange={handleSelectImages} />
              
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions"
                value={instructions} 
                  onChange={(event) => {
                  setInstructions(event.target.value);
                  }}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Funcionamento</label>
              <input 
                id="opening_hours"
                value={openingHours} 
                  onChange={(event) => {
                  setOpeningHours(event.target.value);
                  }} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={openOnWeekends ? "active" : ""} 
                  onClick={()=> setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button 
                  type="button"
                  className={!openOnWeekends ? "active" : ""} 
                  onClick={()=> setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
