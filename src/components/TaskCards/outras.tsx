import React, { Children, useCallback, useState } from 'react';
import styles from '../../assets/styles/components/taskCards.module.sass';
import Image from 'next/image';
import Star from '../../assets/images/svg/star.svg';
import Pencil from '../../assets/images/svg/pencil.svg';

import { IoMdClose } from 'react-icons/io';

const TaskCards = ({ Task, Title, elementNumber, children }: any) => {
    const [Color, SetColor] = useState<string>('container');
    let i: number = 0;
    let index: string[] = [
        'container',
        'containerRed',
        'containerBlue',
        'containerYellow',
        'containerGreen'
    ];

    const themeColor = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            i > index.length - 1 ? (i = 0) : i;
            let element = document.getElementById('TaskCards2');
            if (index[1] !== null || index[i] !== undefined) {
                i++;
                index.map(val => element?.classList.remove(styles[val]));
                element?.classList.add(styles[index[i]]);
                if (index[i] === undefined) {
                    index.map(val => element?.classList.remove(styles[val]));
                    element?.classList.add(styles['container']);
                }
            }
        },
        [index]
    );

    return (
        <div className={styles.container} id="TaskCards2">
            <section className={styles.boxTitle}>
                <input type="text" placeholder="Titulo" />
                <Image src={Star} alt="icon star" />
            </section>
            <hr className={styles.line} />
            <section className={styles.boxTask}>
                <textarea
                    name="tasksTxt"
                    className={styles.tasksTxt}
                    cols={30}
                    rows={15}
                    placeholder="digite aqui a nota..."
                ></textarea>
            </section>
            <div className={styles.boxEdits}>
                <Image className={styles.pencil} src={Pencil} alt="icon star" />
                <button onClick={themeColor}>{children}</button>
                <IoMdClose className={styles.closeIcon} />
            </div>
        </div>
    );
};

export default TaskCards;
