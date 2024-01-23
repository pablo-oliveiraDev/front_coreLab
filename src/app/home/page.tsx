import React from "react";
import TaskCards from "@/components/TaskCards/page";
import styles from '@/assets/styles/pages/home.module.sass'

export default function Home() {
  return (
    <div className={styles.container}>
      <TaskCards />
    </div>
  );
}
