'use client';
import './details.css';
import { toast } from 'react-toastify';
import { jsonBinAPI } from '../../services/api';
import type { Hotel } from '../../types/hotel';
import type { ApiHotel } from '../Tab2';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { 
  FaUmbrellaBeach,
  FaWifi,
  FaBuilding
} from "react-icons/fa6";
import { MdPool } from "react-icons/md";
import { BiSolidCarGarage } from "react-icons/bi";
import { ReactNode } from "react";
import { IonContent, IonHeader, IonPage } from '@ionic/react';
import { Header } from '../../components/header';

export const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const perkIcons: Record<string, ReactNode> = {
    "Wifi": <FaWifi />,
    "Praia": <FaUmbrellaBeach />,
    "Piscina": <MdPool />,
    "Garagem": <BiSolidCarGarage />,
    "Terraço": <FaBuilding />
  };

  useEffect(() => {
    if (!id) return;

    let mounted = true;

    async function loadHotel() {
      try {
        setLoading(true);
        setError(null);

        const data = await jsonBinAPI.fetchPropertyData();
        const arr: ApiHotel[] = data?.hotels ?? [];

        const normalized: Hotel[] = arr.map((h: ApiHotel) => {
          const address = h.address ?? {};
          const str = address.street || '';
          const num = address.number || '';
          const neigh = address.neighboorhood || address.neighborhood || '';
          const city = address.city || '';
          const uf = address.UF || '';
          const ctr = address.country || '';

          const locationStr = [city, uf].filter(Boolean).join(', ') || 'Local não informado';
          const priceAmount = h.price?.amount ? Number(h.price.amount) : 0;
          const rating = h.review?.rating ? Number(h.review.rating) : 0;
          const mainImage = Array.isArray(h.images) && h.images.length > 0 ? h.images[0] : `https://picsum.photos/seed/hotel${h.id}/600/400`;

          return {
            id: h.id ?? Math.random().toString(36).slice(2, 9),
            name: h.name ?? 'Nome não informado',
            location: locationStr,
            address: [str, num, neigh, city, uf, ctr].filter(Boolean),
            price: priceAmount,
            oldPrice: null,
            rating: Number.isNaN(rating) ? 0 : rating,
            reviews: typeof h.reviews === 'number' ? h.reviews : 0,
            perks: Array.isArray(h.amenities) ? h.amenities : [],
            image: mainImage,
            avaliationAmount: Number(h.avaliationAmount) || 0,
            slogan: h.slogan ?? "Descrição:",
            description: h.description ?? "",
            images: Array.isArray(h.images) && h.images.length > 0 ? h.images : [mainImage],
          } as Hotel;
        });

        const found = normalized.find(h => String(h.id) === id) || null;
        if (mounted) setHotel(found);
      } catch (err) {
        console.error('Erro ao carregar hotel:', err);
        if (mounted) setError('Falha ao buscar hotel. Verifique a API.');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadHotel();

    return () => { mounted = false; };
  }, [id]);

  if (loading) return <p>Carregando hotel...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!hotel) return <p>Hotel não encontrado.</p>;


  // Salvar hotel nas reservas
  function handleBookHotel() {
    const myList = localStorage.getItem('@havenly');
    let savedHotels = myList ? JSON.parse(myList) : [];

    // Verifica se o hotel já está salvo
    const hasFilme = savedHotels.some((savedHotel: any) => savedHotel.id === hotel?.id);

    if (hasFilme) {
      toast.warn('Você já realizou a reserva deste hotel!');
      return;
    }

    savedHotels.push(hotel);
    localStorage.setItem('@havenly', JSON.stringify(savedHotels));
    toast.success('Reserva feita com sucesso!');
  }

  return (
    <IonPage>
      <IonHeader>
        <Header />
      </IonHeader>

      <IonContent fullscreen>
        <div className="details-content">
          <div className="details-filters">
            <div className="details-filter">
              <img src="/images/icons/locIcon.png" alt="Localização" width={24} height={24} />
              <span>{hotel.address.length > 0 ? hotel.location : 'Endereço não informado'}</span>
            </div>

            <div className="details-filter">
              <img src="/images/icons/calendarIcon.png" alt="Datas" width={24} height={24} />
              <span className="details-filter-span">
                <span className="details-filter-label">Datas</span>
                <span>23 de ago. - 27 de ago.</span>
              </span>
            </div>

            <div className="details-filter">
              <img src="/images/icons/userIcon.png" alt="Hóspedes" width={24} height={24} />
              <span className="details-filter-span">
                <span className="details-filter-label">Hóspedes</span>
                <span>2 hóspedes, 1 quarto</span>
              </span>
            </div>
          </div>

          <main className="details-main">
            <div className="details-header">
              <h1>{hotel.name}</h1>
              <div className="details-header-actions">
                <img src="/images/icons/loveIcon.png" alt="Favoritar" width={24} height={24} style={{cursor: "pointer"}} />
                <img src="/images/icons/shareIcon.png" alt="Compartilhar" width={24} height={24} style={{cursor: "pointer"}} />
              </div>
            </div>

            <div className="details-body">
              <div className="details-gallery">
                <section className="details-gallery-section">
                  <div className="details-gallery-main-side">
                    <div className="details-gallery-main">
                      <img
                        src={hotel.image}
                        alt="Imagem principal"
                        width={300}
                        height={400}
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      />
                    </div>

                    <div className="details-gallery-side">
                      {hotel.images.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`Imagem ${i}`}
                          width={100}
                          height={120}
                          style={{ objectFit: 'cover', width: '50%', height: '100%' }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="details-description">
                    <p style={{ fontWeight: 'bold', fontSize: 20 }}>
                      {hotel.slogan}.
                    </p>

                    <p style={{ color: '#888', marginTop: '15px', marginBottom: '20px', lineHeight: "22px"}}>
                      {hotel.description}
                    </p>

                    <span className="details-description-label">Dados confiáveis:</span>
                    
                    <p style={{ color: '#888', marginTop: '5px' }}>
                      Os hóspedes dizem que a descrição e as fotos desta acomodação são muito precisas.
                    </p>

                    <button
                      onClick={handleBookHotel}
                      className="details-description-btn"
                    >
                      Reservar
                    </button>
                  </div>
                </section>
              </div>

              <div className="details-features">
                {hotel.perks.map((perk, i) => {
                  const icon = perkIcons[perk] ?? null;
                  return (
                    <div className="details-feature" key={i}>
                      {icon && <span className="perk-icon">{icon}</span>}
                      <span>{perk}</span>
                    </div>
                  )
                })}
              </div>

              <div className="details-rating">
                <div className="details-rating-header">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <span className="details-rating-title">
                      {hotel.rating >= 9 ? 'Excelente' : hotel.rating >= 8 ? 'Muito bom' : hotel.rating >= 6.5 ? 'Bom' : 'Médio'}
                    </span>
                    <div className="details-rating-sub">{hotel.avaliationAmount} Avaliações</div>
                  </div>
                  <span className="details-rating-score">{hotel.rating.toFixed(1)}</span>
                </div>

                <span className='divisor'></span>

                <div>
                  <span style={{fontWeight: 'bold', fontSize: 16}}>O que os hópedes falam sobre esta acomodação?</span>

                  <p className='comment'>Ótima localização, perto de supermercados e paradas de ônibus e metrô</p>
                  <span className='comment-author'>Anna Eich</span>

                  <p className='comment'>As instalações são bonitas, joviais e apresentam uma imagem positiva de consciência ambiental e social. A segurança no acesso e dentro do prédio são também muito efetivas!</p>
                  <span className='comment-author'>Darles Thume</span>

                  <p className='comment'>Ambiente super calmo e tranquilo. Ótima localização, próximo à shoppings! Comodidade excelente! Gostei demais!!</p>
                  <span className='comment-author'>Julia Rafaela</span>
                </div>
              </div>

              <button
                onClick={handleBookHotel}
                className="details-description-btn2"
              >
                Reservar
              </button>
            </div>
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
}