import React, { Children, useCallback, useEffect, useState } from 'react';
import styles from '../../assets/styles/components/taskCards.module.sass';
import Image from 'next/image';
import Star from '@/assets/images/svg/star.svg';
import Pencil from '../../assets/images/svg/pencil.svg';
import Bucket from '@/assets/images/svg/bucket.svg';

import { IoMdClose } from 'react-icons/io';

const TaskCards = ({ DataTasks, elementNumber, children }: any) => {
    const [style, setStyle] = useState<string>('');
    const [titulo, setTitulo] = useState<string>(DataTasks.titulo);
    const [task, setTask] = useState<string>(DataTasks.descricao);
    const [categoria, setCategoria] = useState<string>(DataTasks.nome_categoria);
    const [collors, setCollors] = useState<number>(0);
    let i: number = 0;
    let index: string[] = [
        'container',
        'containerRed',
        'containerBlue',
        'containerYellow',
        'containerGreen'
    ];

    const themeColor = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        i++;
        i > index.length - 1 ? (i = 0) : i;
        let element = document.getElementById(elementNumber);

        if (index[i] !== null || index[i] !== undefined) {
            index.map(val => element?.classList.remove(styles[val]));
            element?.classList.add(styles[index[i]]);
        }
    }, []);

    useEffect(() => {
        setStyle(style);
    }, [style]);

    return (
        <div
            className={styles.container}
            style={{ backgroundColor: style }}
            id={elementNumber}
        >
            <section className={styles.boxTitle}>
                <input
                    type="text"
                    placeholder="Titulo"
                    style={{ backgroundColor: style }}
                    value={titulo}
                    onChange={e => setTitulo(e.target.value)}
                />
                <button className={styles.btn_star}>
                    <Image src={Star} alt="icon star" />
                </button>
            </section>
            <section>
                <select name="categoria" id="">
                    <option value={categoria}>
                        {categoria}
                    </option>
                </select>
            </section>

            <section className={styles.boxTask}>
                <textarea
                    name="tasksTxt"
                    className={styles.tasksTxt}
                    cols={30}
                    rows={15}
                    placeholder="digite aqui a nota..."
                    style={{ backgroundColor: style }}
                    value={task}
                    onChange={e => setTask(e.target.value)}
                ></textarea>
            </section>
            <div className={styles.boxEdits}>
                <section>
                    <button>
                        <Image
                            className={styles.pencil}
                            src={Pencil}
                            alt="icon star"
                        />
                    </button>
                    <button onClick={themeColor}>
                        <Image src={Bucket} alt="bucket" />
                    </button>
                </section>
                <section>
                    <button>
                        <IoMdClose className={styles.closeIcon} />
                    </button>
                </section>
            </div>
        </div>
    );
};

export default TaskCards;
