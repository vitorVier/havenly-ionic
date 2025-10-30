import './security.css';

import userProfileIcon from '../../../public/images/icons/userProfileIcon.png';
import engIcon from '../../../public/images/icons/engIcon.png';
import { IonContent, IonHeader, IonPage } from '@ionic/react';
import { Header } from '../../components/header';
import { Link } from 'react-router-dom';

export default function SecurityPage() {
  return (
    <IonPage>
        <IonHeader>
            <Header />
        </IonHeader>
          
        <IonContent fullscreen>
            <main className="security-container">
                <nav className="security-tabs">
                    <Link to="/profile">
                    <span className="tab">Meu Perfil</span>
                    </Link>

                    <Link to="/security">
                    <span className="tab active">Segurança</span>
                    </Link>
                </nav>

                <div className="security-content">
                    <section className="security-photo-section">
                    <span className="security-photo-label">Foto de Perfil</span>

                    <div className="security-photo">
                        <img
                        src={userProfileIcon}
                        alt="User Profile Icon"
                        width={100}
                        height={100}
                        />

                        <img
                        src={engIcon}
                        alt="Edit Icon"
                        width={40}
                        height={40}
                        className="eng-icon"
                        />
                    </div>

                    </section>

                    <section className="security-info-section">
                    <h2 className="security-info-title">Informações Pessoais</h2>

                    <div className="security-fields">
                        <div className="security-field-row">
                        <div className="security-field">
                            <label>
                            <span className="field-label">CPF - </span>
                            <span className="field-edit">Alterar</span>
                            </label>

                            <input
                            className="field-input"
                            type="text"
                            maxLength={11}
                            // placeholder="Digite seu nome"
                            />
                        </div>

                        <div className="security-field">
                            <label>
                            <span className="field-label">Endereço - </span>
                            <span className="field-edit">Alterar</span>
                            </label>

                            <input
                            className="field-input"
                            type="text"
                            // placeholder="Digite seu sobrenome"
                            />
                        </div>
                        </div>

                        <div className="security-field-row">
                        <div className="security-field">
                            <label>
                            <span className="field-label">RG - </span>
                            <span className="field-edit">Alterar</span>
                            </label>

                            <input
                            className="field-input"
                            type="text"
                            maxLength={10}
                            // placeholder="Digite seu e-mail"
                            />
                        </div>

                        <div className="security-field">
                            <label>
                            <span className="field-label">Telefone - </span>
                            <span className="field-edit">Alterar</span>
                            </label>

                            <input
                            className="field-input"
                            type="text"
                            maxLength={13}
                            // placeholder="Digite sua senha"
                            />
                        </div>
                        </div>
                    </div>

                    <div className="security-actions">
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