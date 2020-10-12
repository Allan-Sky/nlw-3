import React from 'react';
import { FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import '../styles/pages/OrphanagesMap.css'

import { Map , TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
// import { Container } from './styles';
import mapLocal from '../images/Local.svg'

const OrpharnagesMap: React.FC = () => {
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
            <TileLayer  url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/> 
        </Map>

          <Link to="" className="create-orphanage">
              <FiPlus size={32} color="#fff"/>
          </Link>
      </div>
  )
}

export default OrpharnagesMap;