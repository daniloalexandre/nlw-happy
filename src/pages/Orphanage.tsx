import '../styles/pages/orphanage.css';

import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import React, { useEffect, useState } from "react";

import { FaWhatsapp } from "react-icons/fa";
import OrphanageType from '../types/OrphanageType';
import Sidebar from "../components/Sidebar";
import api from '../services/api';
import mapIcon from '../utils/mapIcon';
import { useParams } from 'react-router-dom';

const initialValues = {
  id: 0,
  name : "",
  latitude : 0,
  longitude : 0,
  about : "",
  instructions : "",
  opening_hours : "",
  open_on_weekend : false,
  images : [{
    id : 0,
    path : ""
  },]
}

export default function Orphanage() {

    const [orphanage, setOrphanage] = useState<OrphanageType>(initialValues);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { id }  =  useParams<{id : string}>();
    
    useEffect(()=>{
        api.get(`/orphanages/${id}`)
        .then((res) => {
            setOrphanage(res.data);
        })
        .catch((error) => {

        })
    },[id])

  return (
    <div id="page-orphanage">
      <Sidebar/>

      <main>
        <div className="orphanage-details">
          {orphanage.images.length > 0 &&
          <img src={orphanage.images[currentIndex].path} alt={orphanage.name} />
          }
          <div className="images">
            {orphanage.images.map((image, index) => {
              return (
                <button 
                key={image.id} 
                className={index === currentIndex ? "active" : ""} 
                type="button"
                onClick={() => {
                  setCurrentIndex(index)
                }}
                >
                  <img src={image.path} alt={orphanage.name} />
                </button>
              )
            })}
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map 
                center={[orphanage.latitude, orphanage.longitude]} 
                zoom={12.5} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                {orphanage.opening_hours}
              </div>
              <div className={orphanage.open_on_weekend ? "open-on-weekends" : "dont-open-on-weekends"}>
                <FiInfo size={32} color={orphanage.open_on_weekend ? "#39CC83" : "#FF6890"} />
                {orphanage.open_on_weekend ? 
                `Atendemos fim de semana` : 
                `Não Atendemos fim de semana`}
              </div>
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}