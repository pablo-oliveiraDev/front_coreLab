'use client'
import React, { Children, useCallback, useContext, useState } from 'react';
import styles from '../../assets/styles/components/taskCards.module.sass';
import Image from 'next/image';
import Star from '../../assets/images/svg/star.svg';
import Pencil from '../../assets/images/svg/pencil.svg';
import * as T from '@/components/Types/contextTypes';

import { IoMdClose } from 'react-icons/io';
import { StoreNotesContext } from '@/contexts/StoreNotesProviders';
import { Value } from 'sass';

const TaskCards = ({ Task, Title, elementNumber, children }: any) => {
    const { DataTasks }: T.InitialValue = useContext(StoreNotesContext);
    let i: number = 0;
    let index: string[] = [
        'container',
        'containerRed',
        'containerBlue',
        'containerYellow',
        'containerGreen'
    ];
    console.log(DataTasks);
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
        <>
            {Object.values(DataTasks).map((val, index) => (
                <div className={styles.container} id="TaskCards2">
                    <section className={styles.boxTitle} key={index}>
                        <input
                            type="text"
                            placeholder="Titulo"
                            value={val?.titulo}
                            //onChange={''}
                        />
                        <Image src={Star} alt="icon star" />
                    </section>
                    <hr className={styles.line} />
                    <section className={styles.boxTask}>
                        <textarea
                            name="tasksTxt"
                            className={styles.tasksTxt}
                            cols={30}
                            rows={15}
                            value={val?.task}
                            placeholder="digite aqui a nota..."
                        ></textarea>
                    </section>
                    <div className={styles.boxEdits}>
                        <Image
                            className={styles.pencil}
                            src={Pencil}
                            alt="icon star"
                        />
                        <button onClick={themeColor}>{children}</button>
                        <span>Data: {val?.createdAt}</span>
                        <IoMdClose className={styles.closeIcon} />
                    </div>
                </div>
            ))}
        </>
    );
};

export default TaskCards;
