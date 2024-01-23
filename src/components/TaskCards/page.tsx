import React from "react";
import styles from "@/assets/styles/components/taskCards.module.sass";
import { IoIosStarOutline } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { GoPencil } from "react-icons/go";
import { LuPaintBucket } from "react-icons/lu";

const TaskCards = ({ Task, Title }:any) => {
  return (
    <div className={styles.container}>
      <section className={styles.boxTitle}>
        <input type="text" placeholder="Titulo" />
        <IoIosStarOutline />
      </section>
      <section className={styles.boxTask}>
        <textarea
          name="descripcion"
          id=""
          cols={30}
          rows={1}
          placeholder="digite a sua tarefa..."
        />
      </section>
      <div className={styles.boxEdits}>
        <GoPencil />
        <LuPaintBucket />
        <IoMdClose />
      </div>
    </div>
  );
};

export default TaskCards;
