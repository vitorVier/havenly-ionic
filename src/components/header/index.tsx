"use client";
import './header.css';
import { useState } from 'react';

import logoImg from '../../../public/images/logo/logoImg.png';
import logoIcon from '../../../public/images/logo/logoIcon.png';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa6';

export function Header() {
    const [navOpen, setNavOpen] = useState(false);

    return (
        <header>
            <div className="header-content">
                <div className='logo-select'>
                    <Link to="/">
                        <div className='divLogo'>
                            <img
                                alt='Logo icon'
                                src={logoIcon}
                                className='imgIcon'
                            />
                            <img
                                alt='Logo image'
                                src={logoImg}
                                className='imgLogo'
                            />
                        </div>
                    </Link>
                </div>

                <div className='right-header'>
                    <Link to='/profile' className='user-icon'>
                        <FaUser size={18}/>
                    </Link>

                    <button
                        className="hamburger"
                        aria-label="Abrir menu"
                        onClick={() => setNavOpen(!navOpen)}
                    >
                        <span />
                        <span />
                        <span />
                    </button>

                    <nav className={navOpen ? "nav-mobile open" : "nav-mobile"}>
                        <div className='nav-open'>
                            <Link to="/accommodations" onClick={() => setNavOpen(!navOpen)}>Hoteis</Link>
                            <Link to="/reservations" onClick={() => setNavOpen(!navOpen)}>Minhas Reservas</Link>
                            <Link to="/profile" onClick={() => setNavOpen(!navOpen)}>Minha Conta</Link>
                            <Link to="/support" onClick={() => setNavOpen(!navOpen)}>Suporte</Link>

                            <div className="buttons">
                                <Link to="login">
                                    <button onClick={() => setNavOpen(!navOpen)}>Entrar</button>
                                </Link>
                                <Link to="register">
                                    <button onClick={() => setNavOpen(!navOpen)}>Cadastrar</button>
                                </Link>
                            </div>
                        </div>
                    </nav>

                    <nav className="nav-desktop">
                        <select name="lang" id="lang">
                            <option value="0">BRL</option>
                            <option value="1">ENG</option>
                            <option value="2">SPN</option>
                        </select>

                        <Link to="/accommodations">Hoteis</Link>
                        <Link to="/reservations">Minhas Reservas</Link>
                        <Link to="/profile">Minha Conta</Link>
                        <Link to="/support">Suporte</Link>
                        
                        <div className="buttons">
                            <Link to="/login">
                                <button>Entrar</button>
                            </Link>
                            <Link to="/register">
                                <button>Cadastrar</button>
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}