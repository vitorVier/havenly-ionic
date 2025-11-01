import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import { Link } from 'react-router-dom';

import planeIcon from '../../public/images/icons/planeIcon.png';
import calendarIcon from '../../public/images/icons/calendarIcon.png';
import userIcon from '../../public/images/icons/userIcon.png';
import vIcon from '../../public/images/icons/vIcon.png';
import { Header } from '../components/header';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <Header />
      </IonHeader>
      
      <IonContent fullscreen>
        <div className="home-container">
          <main>
            <section className="inputs-home">
              <div className='input-group'>
                <img
                  alt='plane image'
                  src={planeIcon}
                  className='planeIcon'
                />
                <input
                  type="text"
                  placeholder="Para onde você vai?" 
                />
              </div>

              <div className='input-group'>
                <img
                  alt='calendar image'
                  src={calendarIcon}
                  className='calendarIcon'
                />
                <input
                  type="date"
                  placeholder="Datas" 
                />
              </div>

              <div className='input-group'>
                <img
                  alt='user image'
                  src={userIcon}
                  className='userIcon'
                />
                <input
                  type="number"
                  placeholder="Hospedes?" 
                />
              </div>
            </section>

            <div className='slogan'>
              <h1>
                Descubra sua <br />
                próxima experiência <br />
                inesquecível
              </h1>

              <ul>
                <li>
                  <img src={vIcon} alt='✓' className='liImage'/> <p>Cancelamento grátis na marioria dos quartos</p>
                </li>

                <li>
                  <img src={vIcon} alt='✓' className='liImage'/> <p>Pagamento parcelado</p>
                </li>

                <li>
                  <img src={vIcon} alt='✓' className='liImage'/> <p>Avaliações reais de hóspedes</p>
                </li>
              </ul>

              <Link to="accommodations" style={{width: '90%', margin: '0 auto 0 auto'}}>
                <button className='search'>
                  BUSCAR HOSPEDAGEM
                </button>
              </Link>
            </div>
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
