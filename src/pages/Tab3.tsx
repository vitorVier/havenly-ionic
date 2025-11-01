'use client'
import './Tab3.css';

import treshIcon from '../../public/images/icons/trashIcon.png';
import { toast } from 'react-toastify';
import type { Hotel } from '../types/hotel';
import { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Header } from '../components/header';
import { Link } from 'react-router-dom';

const Tab3: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([])

  useEffect(() => {
    const myList = localStorage.getItem('@havenly');

    if (myList) {
      setHotels(JSON.parse(myList));
    } else {
      setHotels([]);
    }
  }, [])

  function deleteReservation(id: string | number) {
    let filterHotels = hotels.filter((item) => {
      return(item.id !== id)
    })

    setHotels(filterHotels);
    localStorage.setItem('@havenly', JSON.stringify(filterHotels));
    toast.success('Reserva excluída com sucesso!')
  }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <Header />
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Reservations</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="reservations-content">
          <h1 className="reservations-title">Minhas Reservas</h1>

          {hotels.length === 0 && (
            <div className='no-reserve'>
              <span>Você não possui nenhuma reserva.</span>
            </div>
          )}

          <div className="reservations-grid">
            {hotels.map((res) => (
              <div className="reservation-card" key={res.id}>
                <div className="reservation-image">
                  <img 
                    src={res.image} 
                    alt='Main image'
                    width={500}
                    height={300}
                    style={{
                      objectFit: 'cover', 
                      width: '100%', 
                      height: '100%'
                    }}
                  />
                </div>

                <div className="reservation-info">
                  <div className="reservation-details">
                    <div className="reservation-title">{res.name}</div>
                    <div className="reservation-location">{res.location}</div>
                    <div className="reservation-dates">Teste</div>
                  </div>
                  
                  <div className="reservation-actions">
                    <button 
                      className="reservation-delete" 
                      onClick={() => deleteReservation(res.id)}
                    >
                      <img 
                        src={treshIcon} 
                        alt="Excluir" 
                        width={22}
                        height={22}
                      />
                    </button>

                    <Link to={`/details/${res.id}`}>
                      <button className="reservation-details-btn">
                        Detalhes
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
