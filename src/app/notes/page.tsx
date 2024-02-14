'use client';
import React, { useCallback, useContext } from 'react';
import TaskCards from '@/components/TaskCards/page';
import TaskCardsOut from '@/components/TaskCards/outras';
import styles from '@/assets/styles/pages/home.module.sass';
import * as T from '@/components/Types/contextTypes';
import Header from '@/components/Header/page';
import LoadingPage from '@/components/Loading/loading';
import Bucket from '@/assets/images/svg/bucket.svg';
import Image from 'next/image';
import { Metadata } from 'next';
import { StoreNotesContext } from '@/contexts/StoreNotesProviders';
import { useRouter } from 'next/navigation';

export default function Notes() {
    const { Loged, User, Loading }: T.InitialValue =
        useContext(StoreNotesContext);
    const router = useRouter();   

    if (!Loged) {
        router.push('/');
    } else {
        return (
            <div className={styles.container}>
                <Header />
                <div className={styles.containerAddTask}>
                    {Loading && <LoadingPage />}
                    <span>
                        Titulo:
                        <input
                            id="title"
                            type="text"
                            placeholder="titulo da tarefa"
                        />
                    </span>
                    <hr />
                    <span>
                        Tarefa:
                        <input type="text" placeholder="digite aqui a nota" />
                    </span>

                    <button className={styles.btnAddTask}>Adicionar</button>
                </div>
                <div className={styles.favoritos}>
                    <span>Favoritas</span>
                    <TaskCards elementNumber={0}>
                        <Image
                            className={styles.bucket}
                            src={Bucket}
                            alt="icon star"
                        />
                    </TaskCards>
                </div>
                <div className={styles.outras}>
                    <span>Outras</span>
                    <TaskCardsOut elementNumber={0}>
                        <Image
                            className={styles.bucket}
                            src={Bucket}
                            alt="icon star"
                        />
                    </TaskCardsOut >
                </div>
            </div>
        );
    }
}
