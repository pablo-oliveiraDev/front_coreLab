import React, { useContext } from 'react';
import styles from '../../assets/styles/components/header.module.sass';
import { IoMdClose } from 'react-icons/io';
import { FaRegUserCircle } from 'react-icons/fa';
import iconMenu from '@/assets/images/iconCoreLab.png';
import searchIcon from '@/assets/images/svg/search.svg';
import * as T from '@/components/Types/contextTypes';
import Image from 'next/image';
import { StoreNotesContext } from '@/contexts/StoreNotesProviders';

const Header = () => {
    const { User }: T.InitialValue = useContext(StoreNotesContext);
    let textImageUrl: string = 'data:image/png;base64,';

    return (
        <div className={styles.container}>
            <ul>
                <li>
                    <Image src={iconMenu} alt="icon menu" />
                    Core notes
                    <input type="text" placeholder="Pesquisar notas" />
                    <Image
                        className={styles.imgSearch}
                        src={searchIcon}
                        alt="search icon"
                    />
                </li>

                <li>
                    <Image
                        alt="User image"
                        className={styles.imageUser}
                        src={textImageUrl + User.userImages[0].image}
                        width={40}
                        height={40}
                    />
                    <IoMdClose />
                </li>
            </ul>
        </div>
    );
};

export default Header;
