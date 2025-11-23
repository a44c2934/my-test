"use client";
import { useState } from "react";
import styles from "./shapes.module.css";

const shapes = [
  "square",
  "circle",
  "oval",
  "trapezoid",
  "rectangle",
  "parallelogram",
];

export default function Shapes() {
  const [items, setItems] = useState<string[]>(shapes);
  const [layout, setLayout] = useState<string>("layout1");

  const handleRandom = () => {
    setItems((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  const controlCard = [
    {
      name: "Move Shape Left",
      action: () => setItems((prev) => [...prev.slice(1), prev[0]]),
      icon: () => <div className={styles["triangle-left"]}></div>,
    },
    {
      name: "Move Position",
      action: () => setLayout((prev) => (prev === "layout1" ? "layout2" : "layout1")),
      icon: () => (
        <div className={styles["triangle-up-down"]}>
          <div className={styles["triangle-up"]}></div>
          <div className={styles["triangle-down"]}></div>
        </div>
      ),
    },
    {
      name: "Move Shape Right",
      action: () => setItems((prev) => [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)]),
      icon: () => <div className={styles["triangle-right"]}></div>,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.topControls}>
        {controlCard.map((control, index) => (
          <div key={index} onClick={control.action} className={`${styles.controlCard}`}>
            {control.icon()}
            <button className={styles.actionBtn}>
              {control.name}
            </button>
          </div>
        ))}
      </div>
      <div className={styles.separator} />
      <div className={`${styles.shapeParent} ${styles[layout]}`}>
        {items.map((shape, index) => (
          <div key={index} className={`${styles.shapeCard} ${styles[`shape${index + 1}`]}`} onClick={handleRandom}>
            <div className={styles[shape]} />
          </div>
        ))}
      </div>
    </div>
  );
}