import React, {useEffect, useState} from 'react';
import { FiArrowRight, FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import '../styles/pages/OrphanagesMap.css'

import { Map , TileLayer, Marker, Popup} from 'react-leaflet'


import mapLocal from '../images/Local.svg'
import happyMapIcon from '../utils/mapIcon';
import api from '../services/api';
interface Orphanage {
    id:number,
    latitude:number,
    longitude:number,
    name:string
}


const OrpharnagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])
  
  useEffect(() => {
     api.get('/orphanages').then(response => {
         setOrphanages(response.data)
     }) 
  }, [])



  return (
      <div id="page-map">
          <aside>
              <header>
                  <img src={mapLocal} alt="happy"/>
                 <h2>Escolha um orfanato no mapa</h2>
                 <p>Muitas crianças estão esperando a sua visita :)</p>
              </header>


              <footer>
                    <strong>Petrolina</strong>
                    <span>Pernanbuco</span>
              </footer>

          </aside>

          <Map 
            center={[-9.3872197,-40.5025375]}
            zoom={15}
            style={{
                width:'100%',
                height:'100%'
            }}
           
        >
            {
                orphanages.map(orphanage => (

                <Marker key={orphanage.id} position={[orphanage.latitude,orphanage.longitude]} icon={happyMapIcon}>
                    <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                        {orphanage.name}
                        <Link to={`orphanages/${orphanage.id}`}>
                            <FiArrowRight size={20} color="#fff"/> 
                        </Link>
                    </Popup>
                </Marker>
                ))
            }
            <TileLayer  url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/> 
        </Map>

          <Link to="orphanages/create" className="create-orphanage">
              <FiPlus size={32} color="#fff"/>
          </Link>
      </div>
  )
}

export default OrpharnagesMap;