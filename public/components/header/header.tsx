"use client";
import Link from 'next/link';
import Image from 'next/image';
import './header.css';
import { useState } from 'react';

import logoImg from '../../../public/images/logo/logoImg.png';
import logoIcon from '../../../public/images/logo/logoIcon.png';

export function Header() {
    const [navOpen, setNavOpen] = useState(false);

    return (
        <header>
            <div className="header-content">
                <div className='logo-select'>
                    <Link href="/">
                        <div className='divLogo'>
                            <Image
                                alt='Logo icon'
                                src={logoIcon}
                                className='imgIcon'
                            />
                            <Image
                                alt='Logo image'
                                src={logoImg}
                                className='imgLogo'
                            />
                        </div>
                    </Link>

                    <select name="selector" id="selector">
                        <option value="0">Encontre sua estadia ideal</option>
                    </select>
                </div>

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
                    <select name="lang" id="lang">
                        <option value="0">BRL</option>
                        <option value="1">ENG</option>
                        <option value="2">SPN</option>
                    </select>
                    
                    <Link href="/accommodations" onClick={() => setNavOpen(!navOpen)}>Hoteis</Link>
                    <Link href="/reservations" onClick={() => setNavOpen(!navOpen)}>Minhas Reservas</Link>
                    <Link href="/profile" onClick={() => setNavOpen(!navOpen)}>Minha Conta</Link>
                    <Link href="/support" onClick={() => setNavOpen(!navOpen)}>Suporte</Link>

                    <div className="buttons">
                        <Link href="login">
                            <button onClick={() => setNavOpen(!navOpen)}>Entrar</button>
                        </Link>
                        <Link href="register">
                            <button onClick={() => setNavOpen(!navOpen)}>Cadastrar</button>
                        </Link>
                    </div>
                </nav>

                <nav className="nav-desktop">
                    <select name="lang" id="lang">
                        <option value="0">BRL</option>
                        <option value="1">ENG</option>
                        <option value="2">SPN</option>
                    </select>

                    <Link href="/accommodations">Hoteis</Link>
                    <Link href="/reservations">Minhas Reservas</Link>
                    <Link href="/profile">Minha Conta</Link>
                    <Link href="/support">Suporte</Link>
                    
                    <div className="buttons">
                        <Link href="/login">
                            <button>Entrar</button>
                        </Link>
                        <Link href="/register">
                            <button>Cadastrar</button>
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}