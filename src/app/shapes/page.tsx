"use client";

import { useTranslations } from "next-intl";
import TitlePage from "../../../components/layout/title/TitlePage";
import Shapes from "../../../components/shapes/Shapes";

export default function ShapesPage() {
  const t = useTranslations();

  return (
    <div>
      <TitlePage name={t("mainMenu.layoutStyle")} />
      <Shapes />
    </div>
  );
}
