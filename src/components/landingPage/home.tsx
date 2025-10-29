import { Link } from 'react-router-dom';
import './home.css';

import planeIcon from '../../../public/images/icons/planeIcon.png';
import calendarIcon from '../../../public/images/icons/calendarIcon.png';
import userIcon from '../../../public/images/icons/userIcon.png';
import vIcon from '../../../public/images/icons/vIcon.png';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
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

          <Link to="accommodations">
            <button className='search'>
              BUSCAR HOSPEDAGEM
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ExploreContainer;
