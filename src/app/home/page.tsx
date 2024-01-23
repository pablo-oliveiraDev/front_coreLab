import React from "react";
import TaskCards from "@/components/TaskCards/page";
import styles from "@/assets/styles/pages/home.module.sass";
import Header from "@/components/header/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home"
};
export default function Home() {
  return (
    <div className={styles.container}>
      <Header/>
      <div className={styles.containerAddTask}>
        <span>
          Titulo:
          <input id="title" type="text" placeholder="titulo da tarefa" />
        </span>
        <hr />
        <span>
          Tarefa:
          <input type="text" placeholder="digite aqui a tarefa" />
        </span>

        <button className={styles.btnAddTask}>Adicionar</button>
      </div>
      <TaskCards />
    </div>
  );
}
