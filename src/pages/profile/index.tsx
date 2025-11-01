'use client'
import { useEffect, useState } from 'react';
import './profile.css';

import userProfileIcon from '../../../public/images/icons/userProfileIcon.png';
import engIcon from '../../../public/images/icons/engIcon.png';
import { Link } from 'react-router-dom';
import { IonContent, IonHeader, IonPage } from '@ionic/react';
import { Header } from '../../components/header';

export const ProfilePage: React.FC = () => {

  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) setProfileImage(savedImage);
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfileImage(result);
        localStorage.setItem('profileImage', result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <Header />
      </IonHeader>
      
      <IonContent fullscreen>
        <main className="profile-container">
          <nav className="profile-tabs">
            <Link to="/profile">
              <span className="tab active">Meu Perfil</span>
            </Link>

            <Link to="/security">
              <span className="tab">Segurança</span>
            </Link>
          </nav>

          <div className="profile-content">
            <section className="profile-photo-section">
              <span className="profile-photo-label">Foto de Perfil</span>

              <div className="profile-photo">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="User Profile"
                    className="profileImage"
                  />
                ) : (
                  <img
                    src={userProfileIcon}
                    alt="User Icon"
                    className="profileIcon"
                  />
                )}

                {!profileImage && (
                  <label htmlFor="profile-upload" className="eng-icon-label">
                    <img
                      src={engIcon}
                      alt="Edit Icon"
                      width={40}
                      height={40}
                      className="eng-icon"
                    />
                  </label>
                )}

                <input
                  type="file"
                  id="profile-upload"
                  accept="image/*"
                  style={{ position: "absolute", width: 200, height: 200 , borderRadius: '50%', opacity: 0, cursor: "pointer"}}
                  onChange={handleImageChange}
                />
              </div>

              {profileImage && (
                <button
                  className="btn remove-photo"
                  onClick={() => {
                    setProfileImage(null);
                    localStorage.removeItem('profileImage');
                  }}
                >
                  Remover Foto
                </button>
              )}
            </section>

            <section className="profile-info-section">
              <h2 className="profile-info-title">Informações Gerais</h2>

              <div className="profile-fields">
                <div className="profile-field-row">
                  <div className="profile-field">
                    <label>
                      <span className="field-label">Nome - </span>
                      <span className="field-edit">Alterar</span>
                    </label>

                    <input
                      className="field-input"
                      type="text"
                      // placeholder="Digite seu nome"
                    />
                  </div>

                  <div className="profile-field">
                    <label>
                      <span className="field-label">Sobrenome - </span>
                      <span className="field-edit">Alterar</span>
                    </label>

                    <input
                      className="field-input"
                      type="text"
                      // placeholder="Digite seu sobrenome"
                    />
                  </div>
                </div>

                <div className="profile-field-row">
                  <div className="profile-field">
                    <label>
                      <span className="field-label">E-mail - </span>
                      <span className="field-edit">Alterar</span>
                    </label>

                    <input
                      className="field-input"
                      type="email"
                      // placeholder="Digite seu e-mail"
                    />
                  </div>

                  <div className="profile-field">
                    <label>
                      <span className="field-label">Senha - </span>
                      <span className="field-edit">Alterar</span>
                    </label>

                    <input
                      className="field-input"
                      type="password"
                      // placeholder="Digite sua senha"
                    />
                  </div>
                </div>
              </div>

              <div className="profile-actions">
                <button className="btn switch-account">Trocar de Conta</button>
                <button className="btn logout">SAIR</button>
              </div>
            </section>
          </div>
        </main>
      </IonContent>
    </IonPage>
  );
}