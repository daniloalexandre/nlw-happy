import '../styles/pages/orphanages-map.css'
import 'leaflet/dist/leaflet.css'

import { Map, TileLayer } from 'react-leaflet'

import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import React from 'react';
import mapMarker from '../images/map-marker.svg';

function OrphanagesMap(){

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarker} alt="Map Marker"/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>
                <footer>
                    <strong>Campina Grande</strong>
                    <span>Paraíba</span>
                </footer>
            </aside>
            <Map
            center={[-7.242662,-35.9716054]}
            zoom={12.5}
            style={{width: '100%', height: '100%'}}> 
                {/*<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>*/}
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />  
            </Map>
            <Link to="" className="create-orphanage">
                <FiPlus size={32} color="#FFFF"/>
            </Link>
        </div>
    )
}

export default OrphanagesMap;