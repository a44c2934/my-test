"use client";

import { useEffect, useState, useTransition } from "react";
import { Locale, useTranslations } from "next-intl";
import { getUserLocale, setUserLocale } from "../../services/locale";
import styles from "./languageSwitcher.module.css";

const LanguageSwitcher = () => {
  const [isPending, startTransition] = useTransition();
  const [currentLocale, setCurrentLocale] = useState<Locale | null>(null);
  const t = useTranslations();

  useEffect(() => {
    getUserLocale().then(locale => {
      setCurrentLocale(locale as Locale);
    });
  }, []);

  const switchLanguage = (value: "en" | "th") => {
    const locale = value;
    startTransition(() => {
      setUserLocale(locale);
      setCurrentLocale(locale);
    });
  };


  return (
    <div className={styles.container}>
      <select
        value={currentLocale || ""}
        onChange={(e) => switchLanguage(e.target.value as "en" | "th")}
        disabled={isPending}
        className={styles.select}
      >
        <option value="en">{t('language.en')}</option>
        <option value="th">{t('language.th')}</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
