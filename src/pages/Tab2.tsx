'use client'
import React, { useEffect, useState } from "react";
import { jsonBinAPI } from '../services/api';
import './Tab2.css';

import type { Hotel } from '../types/hotel';

export type ApiHotel = any;

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';
import { Link } from "react-router-dom";
import { Header } from "../components/header";

const Tab2: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [town, setTown] = useState("");
  const [price, setPrice] = useState(2000);

  const [filters, setFilters] = useState({
    cafe: false,
    praia: false,
    piscina: false,
    garagem: false,
    banheira: false,
  });

  useEffect(() => {
    let mounted = true;

    async function loadHotels() {
      try {
        setLoading(true);
        setError(null);

        const hotels = await fetchHotels();
        if (mounted) setHotels(hotels);
      } catch (err) {
        console.error('Erro ao carregar hotéis:', err);
        if (mounted) setError('Falha ao buscar hotéis.');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadHotels();
    return () => { mounted = false; };
  }, []);

  function normalizeHotels(arr: ApiHotel[]): Hotel[] {
    return arr.map((h: ApiHotel) => {
      const address = h.address ?? {};
      const str = address.street || '';
      const num = address.number || '';
      const neigh = address.neighboorhood || address.neighborhood || '';
      const city = address.city || '';
      const uf = address.UF || '';
      const ctr = address.country || '';
      const locationStr = [str, num, neigh, city, uf, ctr]
        .filter(Boolean)
        .join(', ') || h.address?.street || 'Local não informado';

      const priceAmount = h.price?.amount ? Number(h.price.amount) : 0;
      const rating = h.review?.rating ? parseFloat(String(h.review.rating)) : 0;
      const image = Array.isArray(h.images) && h.images.length > 0 
        ? h.images[0] 
        : `https://picsum.photos/seed/hotel${h.id}/600/400`;

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
        avaliationAmount: Number(h.avaliationAmount) || 0,            
        image,
      } as Hotel;
    });
  }

  async function fetchHotels(): Promise<Hotel[]> {
    const data = await jsonBinAPI.fetchPropertyData();
    const arr: ApiHotel[] = data?.hotels ?? [];
    return normalizeHotels(arr);
  }

  function normalizeText(text: string): string {
    return text
      .normalize("NFD") // separa caracteres de acentos
      .replace(/[\u0300-\u036f]/g, "") // remove acentos
      .toLowerCase();
  }

  async function filterHotels() {
    let mounted = true;

    try {
      setLoading(true);
      setError(null);

      let hotels = await fetchHotels();

      hotels = hotels.filter((hotel) => {

        // Filtra Cidade/Destino
        const normalizedTown = normalizeText(town);

        const matchAddress = hotel.address.some((a) =>
          normalizeText(a).includes(normalizedTown)
        );

        const matchLocation = normalizeText(hotel.location).includes(normalizedTown);

        if (town.trim() && !matchAddress && !matchLocation) {
          return false;
        }

        // Filtra Preço
        if (hotel.price > price) return false;

        // Filtra Perks
        if (filters.cafe && !hotel.perks.some(p => p.toLowerCase().includes("cafe"))) return false;
        if (filters.praia && !hotel.perks.some(p => p.toLowerCase().includes("praia"))) return false;
        if (filters.piscina && !hotel.perks.some(p => p.toLowerCase().includes("piscina"))) return false;
        if (filters.garagem && !hotel.perks.some(p => p.toLowerCase().includes("garagem"))) return false;
        if (filters.banheira && !hotel.perks.some(p => p.toLowerCase().includes("banheira"))) return false;

        return true;
      });

      if (mounted) setHotels(hotels);

    } catch (err) {
      console.error('Erro ao carregar hotéis:', err);
      if (mounted) setError('Falha ao buscar hotéis.');
    } finally {
      if (mounted) setLoading(false);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <Header />
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="accommodations-container">
          {/* Barra de pesquisa */}
          <section className="search-bar">
            <div className="search-input">
              <input 
                type="text"
                placeholder="Destino"
                value={town}
                onChange={(e) => setTown(e.target.value)}
              />
            </div>

            <div className="search-input">
              <input type="date" />
              <span>-</span>
              <input type="date" />
            </div>

            <div className="search-input">
              <input type="text" placeholder="2 hóspedes, 1 quarto" />
            </div>

            <button className="search-btn" onClick={filterHotels}>Buscar</button>
          </section>

          <main className="content">
            {/* Filtros */}
            <aside className="filters">
              <h2>Filtrar por</h2>
              <label>
                <input 
                  type="checkbox" 
                  checked={filters.cafe} 
                  onChange={(e) => setFilters({...filters, cafe: e.target.checked})} 
                /> 
                Café da manhã incluso
              </label>

              <label>
                <input 
                  type="checkbox" 
                  checked={filters.praia} 
                  onChange={(e) => setFilters({...filters, praia: e.target.checked})} 
                /> 
                Próximo a praia
              </label>

              <label>
                <input 
                  type="checkbox" 
                  checked={filters.piscina} 
                  onChange={(e) => setFilters({...filters, piscina: e.target.checked})} 
                /> 
                Piscina
              </label>

              <label>
                <input 
                  type="checkbox" 
                  checked={filters.garagem} 
                  onChange={(e) => setFilters({...filters, garagem: e.target.checked})} 
                /> 
                Garagem
              </label>
              
              <label>
                <input 
                  type="checkbox" 
                  checked={filters.banheira} 
                  onChange={(e) => setFilters({...filters, banheira: e.target.checked})} 
                /> 
                Banheira de hidromassagem
              </label>

              <div className="filter-price">
                <span>Preço por diária</span>
                <input 
                  type="range" 
                  min="0" 
                  max="2400" 
                  id="price" 
                  step="100" 
                  onInput={(e) => setPrice(Number((e.target as HTMLInputElement).value))}
                />
                <span className="price-output">Até {price.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL"
                })}</span>
              </div>

              <button className='btn-filter' onClick={filterHotels}>Filtrar</button>
            </aside>

            {/* Lista de hotéis */}
            <section className="hotels">
              <div className="loading">
                {loading && <p>Carregando acomodações...</p>}
              </div>
              {error && <p className="error">{error}</p>}

              {!loading && !error && hotels.length === 0 && (
                <p>Nenhuma acomodação encontrada.</p>
              )}

              {!loading && !error && hotels.map((hotel) => (
                <div key={hotel.id} className="hotel-card">
                  <div className="img-content">
                    <Link to={`/details/${hotel.id}`}>
                      <img src={hotel.image} alt={hotel.name} />
                    </Link>
                  </div>

                  <div className="hotel-info">
                    <h3>{hotel.name}</h3>

                    <p className="location">{hotel.location}</p>

                    <div className="perks">
                      {hotel.perks.map((perk, i) => (
                        <span key={i}>• {perk} </span>
                      ))}
                    </div>

                    <div className="hotel-footer">
                      <div>
                        <span className="rating"><span className='rating-decimal'>{hotel.rating}</span> {hotel.rating >= 9 ? 'Excelente' : hotel.rating >= 8 ? 'Muito bom' : 'Bom'}</span>
                        <p className="reviews">{hotel.avaliationAmount} avaliações</p>
                      </div>

                      <div className="price">
                        {hotel.oldPrice && (
                          <p className="old-price">{hotel.oldPrice.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                            minimumFractionDigits: 2,
                          })}</p>
                        )}

                        <p className="new-price">{hotel.price.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                          minimumFractionDigits: 2,
                        })}</p>

                        <Link to={`/details/${hotel.id}`}>
                          <button className='btn-book'>Reservar</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
