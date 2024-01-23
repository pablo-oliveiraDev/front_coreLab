import React from "react";
import styles from "../../assets/styles/components/header.module.sass";
import iconMenu from '@/assets/images/iconCoreLab.png';
import Image from 'next/image';

const Header = () => {
  return (
    <header className={styles.container}>
      <ul>
        <li><Image src={iconMenu} alt='icon menu'/></li>

        <li>Contatos</li>

        <li>Sobre</li>

        <li>Vendedores</li>
      </ul>
    </header>
  );
};

export default Header;
