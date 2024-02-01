'use client'
import React, { useContext } from 'react';
import TaskCards from '@/components/TaskCards/page';
import styles from '@/assets/styles/pages/home.module.sass';
import * as T from '@/components/Types/contextTypes';
import Header from '@/components/Header/page';
import Loading from '@/components/Loading/loading';
import { Metadata } from 'next';
import { StoreNotesContext } from '@/contexts/StoreNotesProviders';
import { useRouter } from 'next/navigation';



export default function Notes() {
    const { Loged }: T.InitialValue = useContext(StoreNotesContext);
    const router = useRouter();
    if (!Loged) {
      router.push('/');
    }
   
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.containerAddTask}>
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
                <TaskCards />
            </div>
            <div className={styles.outras}>
                <span>Outras</span>
                <TaskCards />
            </div>
        </div>
    );
}
