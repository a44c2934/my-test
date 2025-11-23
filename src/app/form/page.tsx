"use client";

import React from 'react'
import MainForm from '../../../components/form/MainForm'
import TableData from '../../../components/table/TableData'
import TitlePage from '../../../components/layout/title/TitlePage'
import { useTranslations } from 'next-intl';

export default function FormPage() {
  const t = useTranslations();
  const [dataUpdate, setDataUpdate] = React.useState<IUserData | null>(null);

  return (
    <div>
      <TitlePage name={t("mainMenu.formTable")} />
      <MainForm dataUpdate={dataUpdate} setDataUpdate={setDataUpdate} />
      <TableData setDataUpdate={setDataUpdate} />
    </div>
  )
}
