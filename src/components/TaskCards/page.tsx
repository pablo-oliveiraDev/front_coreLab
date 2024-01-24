import React from "react";
import styles from "../../assets/styles/components/taskCards.module.sass";
import Image from "next/image";
import star from "../../assets/images/svg/star.svg";
import pencil from "../../assets/images/svg/pencil.svg";
import bucket from "../../assets/images/svg/bucket.svg";
import { IoMdClose } from "react-icons/io";

const TaskCards = ({ Task, Title }: any) => {
  return (
    <div className={styles.container}>
      <section className={styles.boxTitle}>
        <input type="text" placeholder="Titulo" />
        <Image src={star} alt="icon star" />
      </section>
      <hr className={styles.line} />
      <section className={styles.boxTask}>
        <textarea
          name="tasksTxt"
          className={styles.tasksTxt}
          cols={30}
          rows={15}
          placeholder="digite aqui a nota..."
          style={{ resize: "none", width: "100%",height:"200px",border:"none" }}></textarea>
      </section>
      <div className={styles.boxEdits}>
        <Image src={pencil} alt="icon star" />
        <Image src={bucket} alt="icon star" />
        <IoMdClose className={styles.closeIcon} />
      </div>
    </div>
  );
};

export default TaskCards;
