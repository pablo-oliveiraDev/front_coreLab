'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import TaskCards from '@/components/TaskCards/page';
import TaskCardsOut from '@/components/TaskCards/outras';
import styles from '@/assets/styles/pages/home.module.sass';
import * as T from '../../Types/contextTypes';
import Star from '@/assets/images/svg/star.svg';
import Header from '@/components/Header/page';
import LoadingPage from '@/components/Loading/loading';
import Bucket from '@/assets/images/svg/bucket.svg';
import Image from 'next/image';
import Api from '@/components/Services/api';
import { Metadata } from 'next';
import { StoreNotesContext } from '@/contexts/StoreNotesProviders';
import { useRouter } from 'next/navigation';

export default function Notes() {
    const [titulo, setTitulo] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [userId, setUserId] = useState<number>(0);
    const [categoriaId, setCategoriaId] = useState<number>(0);
    const { Loged, user, Loading, token, CreateTask }: T.InitialValue =
        useContext(StoreNotesContext);
    const [DataTasks, SetDataTasks] = useState<T.TaskProps[]>([]);
    const router = useRouter();

    const AddNewTask = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (user !== null || user !== undefined) {
            CreateTask(titulo, descricao, status, userId, categoriaId);
        }
    };
    console.log(token);
    useEffect(() => {
        async function LoadTaskByUser() {
            await Api.get(`/tasks`).then(res => {
                console.log(res.data.task);
                const data: any = res.data;
                SetDataTasks(data.task);
            });
        }
        LoadTaskByUser();
    }, []);
    console.log('dataTask:' + DataTasks);
    if (!Loged) {
        router.push('/')!;
    } else {
        return (
            <div className={styles.container}>
                <Header />
                <div className={styles.containerAddTask}>
                    {Loading && <LoadingPage />}
                    <span className={styles.titulo}>
                        <input
                            id="title"
                            type="text"
                            placeholder="Titulo"
                            value={titulo}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setTitulo(e.target.value)}
                        />
                        <button className={styles.btn_favoritos} disabled>
                            <Image src={Star} alt="star" />
                        </button>
                    </span>
                    <span className={styles.tarefasDesc}>
                        <input
                            id="Task"
                            type="text"
                            placeholder="Criar tarefa..."
                            value={descricao}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setDescricao(e.target.value)}
                        />
                    </span>

                    <button className={styles.btnAddTask} onClick={AddNewTask}>
                        Adicionar
                    </button>
                </div>
                <div className={styles.favoritos}>
                    <span>Favoritas</span>
                    <div className={styles.displayFavoritos}>
                        {DataTasks ? (
                            Object.values(DataTasks).map(
                                (tasks, index) =>
                                    tasks.categoria_id === 1 && (
                                        <TaskCards
                                            key={index}
                                            DataTasks={tasks}
                                            elementNumber={index}
                                        />
                                    )
                            )
                        ) : (
                            <h1>Vc ainda nao tem tarefas</h1>
                        )}
                    </div>
                </div>
                <div className={styles.outras}>
                    <span>Outras</span>
                    {DataTasks ? (
                        Object.values(DataTasks).map(
                            (tasks, index) =>
                                tasks.categoria_id === 2 && (
                                    <TaskCards
                                        key={index}
                                        DataTasks={tasks}
                                        elementNumber={index}
                                    />
                                )
                        )
                    ) : (
                        <h1>Vc ainda nao tem tarefas</h1>
                    )}
                </div>
            </div>
        );
    }
}
