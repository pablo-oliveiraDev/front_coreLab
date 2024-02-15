'use client';
import React, { useCallback, useContext, useState } from 'react';
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
    const [Titulo, SetTitulo] = useState<string>('');
    const [Task, SetTask] = useState<string>('');
    const { Loged, User, Loading, CreateTask, DataTasks }: T.InitialValue =
        useContext(StoreNotesContext);
    const router = useRouter();

    const AddNewTask = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (User !== null || User !== undefined) {
            const useId:string | undefined = User?.id;
            CreateTask(useId, Titulo, Task);
        }
    };
    console.log(DataTasks);
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
                            value={Titulo}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => SetTitulo(e.target.value)}
                        />
                    </span>
                    <hr />
                    <span>
                        Tarefa:
                        <input
                            id="Task"
                            type="text"
                            placeholder="digite aqui a nota"
                            value={Task}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => SetTask(e.target.value)}
                        />
                    </span>

                    <button className={styles.btnAddTask} onClick={AddNewTask}>
                        Adicionar
                    </button>
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
                    {/* {DataTasks.map((val,index )=> (
                        <TaskCardsOut elementNumber={0}
                        key={index}                        
                        >
                            <Image
                                className={styles.bucket}
                                src={Bucket}
                                alt="icon star"
                            />
                        </TaskCardsOut>
                    ))} */}
                </div>
            </div>
        );
    }
}
