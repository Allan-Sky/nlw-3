import React, { ChangeEvent, FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';

import { LeafletMouseEvent} from 'leaflet'
import '../styles/pages/create-orphanage.css';
import SideBar from "../components/SideBar";
import happyMapIcon from "../utils/mapIcon";
import { FiPlus } from "react-icons/fi";
import api from "../services/api";
import { useHistory } from "react-router-dom";



export default function CreateOrphanage() {
  const history = useHistory()
  const [position , setPosition] = useState({lat: 0 , lng: 0  })
  
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')

  const [instructions, setInstructions] = useState('')

  const [opening_hours, setOpeningHours] = useState('')

  const [open_on_weekends, setOpenOnWeekends] = useState(true) 

  const [images, setImages] = useState<File[]>([])
  const [previewImages , setPreviewImage] = useState<string[]>([]) 
  const handleMapClick = (event: LeafletMouseEvent) => {
      setPosition(event.latlng)
  }
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const {lat: latitude, lng: longitude} = position
    
    const data = new FormData()

    data.append('name', name)
    data.append('about', about)
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    data.append('instructions', instructions)
    data.append('opening_hours', opening_hours)
    data.append('open_on_weekends', String(open_on_weekends))

    images.forEach(image => {
      data.append('images', image)
    })

    await api.post('orphanages', data)

    history.push('/app')
  }

  const handleSelectImages = async (event : ChangeEvent<HTMLInputElement>) => {
    if(!event.target.files){
      return
    }

    const selectedImages = Array.from(event.target.files)
    
    setImages(selectedImages)

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image)
    })

    setPreviewImage(selectedImagesPreview)
  }
  return (
    <div id="page-create-orphanage">
      <SideBar/>

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-27.2092052,-49.6401092]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer 
                url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
              />

              {
                position.lat !== 0 && 
                  <Marker interactive={false} icon={happyMapIcon} position={[position.lat,position.lng]} />
                
              }

              
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" 
              value={name} 
              onChange={event => setName(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
              id="name" 
              maxLength={300} 
              value={about} 
              onChange={event =>  setAbout(event.target.value)}/>
              
              
            </div>

            <div className="input-block">
              <label htmlFor="">Fotos</label>

              <div className="uploaded-image images-container">
                  {
                    previewImages.map(image => {
                      return (
                        <img src={image} alt={name}/>
                      )
                    })
                  }
                  <label className="new-image"  htmlFor="image[]">
                    <FiPlus size={24} color="#15b6d6" />
                  </label>

                 
              </div>
              <input type="file" multiple id="image[]" onChange={handleSelectImages}/>

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
              id="instructions" 
              value={instructions} 
              onChange={event => setInstructions(event.target.value)}/>
              
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horario de funcionamento</label>
              <input 
              id="opening_hours" 
              value={opening_hours} 
              onChange={event => setOpeningHours(event.target.value)}/>
              
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                type="button" 
                className={open_on_weekends ? 'active' : ''}
                onClick={() => setOpenOnWeekends(true)}
                >Sim</button>
                <button 
                type="button"
                className={!open_on_weekends ? 'active' : ''}
                onClick={() => setOpenOnWeekends(false)}
                
                >Não</button>
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
