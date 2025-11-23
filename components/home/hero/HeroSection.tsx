"use client"

import React from 'react'
import styles from './heroSection.module.css'
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const router = useRouter();
  const t = useTranslations();

  const handleTest1Click = () => {
    router.push('/shapes');
  }
  const handleTest2Click = () => {
    alert('ยังไม่พร้อมใช้งาน');
  }
  const handleTest3Click = () => {
    router.push('/form');
  }

  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.test1} onClick={handleTest1Click}>
          <h4>{t("mainMenu.test")} 1</h4>
          <p>{t("mainMenu.layoutStyle")} </p>
        </div>
        <div className={styles.test2} onClick={handleTest2Click}>
          <h4>{t("mainMenu.test")} 2</h4>
          <p>{t("mainMenu.connectAPI")}</p>
        </div>
        <div className={styles.test3} onClick={handleTest3Click}>
          <h4>{t("mainMenu.test")} 3</h4>
          <p>{t("mainMenu.formTable")}</p>
        </div>
      </div>
    </div>
  )
}
