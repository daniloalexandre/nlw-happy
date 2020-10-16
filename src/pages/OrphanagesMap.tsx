import '../styles/pages/orphanages-map.css'

import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import OrphanageType from '../types/OrphanageType';
import api from '../services/api';
import mapIcon from '../utils/mapIcon';
import mapMarker from '../images/map-marker.svg';

function OrphanagesMap(){
    const [orphanages, setOrphanages] = useState<OrphanageType[]>([]);
    
    useEffect(()=>{
        api.get('/orphanages')
        .then((res) => {
            setOrphanages(res.data);
        })
        .catch((error) => {

        })
    },[])


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
                {orphanages.map(orphanage  => {
                    return (<Marker key={orphanage.id}
                            icon={mapIcon}  
                            position={[orphanage.latitude, orphanage.longitude]}>
                                <Popup closeButton={false} minWidth={240} maxWidth={240} className={'map-popup'}>
                                    {orphanage.name}
                                    <Link to={`/orphanages/${orphanage.id}`} >
                                    <FiArrowRight size={20} color="#FFFF" />
                                    </Link>
                                </Popup>
                            </Marker>)
                })}
            </Map>
            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFFF"/>
            </Link>
        </div>
    )
}

export default OrphanagesMap;