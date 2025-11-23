"use client";

import { useEffect, useState } from "react";
import { Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { deleteUsers, loadFromLocalStorage } from "../../store/usersSlice";
import styles from './tableData.module.css';
import { useTranslations } from "next-intl";

interface ITablePageProps {
  setDataUpdate: React.Dispatch<React.SetStateAction<IUserData | null>>;
}

export default function TablePage({ setDataUpdate }: ITablePageProps) {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.users.list);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const t = useTranslations();

  const handleEdit = (record: IUserData) => {
    setDataUpdate(record);
  }

  const columns: ColumnsType<IUserData> = [
    {
      title: `${t("form.name")}`,
      render: (_, record) => (
        <span>
          {record.title} {record.firstname} {record.lastname}
        </span>
      ),
      sorter: (a, b) => a.firstname.localeCompare(b.firstname),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: `${t("form.gender")}`,
      dataIndex: "gender",
      sorter: (a, b) => a.gender.localeCompare(b.gender),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: `${t("form.mobilePhone")}`,
      dataIndex: "phone",
      sorter: (a, b) => a.phone.localeCompare(b.phone),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: `${t("form.nationality")}`,
      dataIndex: "nationality",
      sorter: (a, b) => a.nationality.localeCompare(b.nationality),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: `${t("form.manage").toUpperCase()}`,
      render: (_, record) => (
        <div className="flex gap-3">
          <Button type="link" onClick={() => handleEdit(record)}>{t("form.edit").toUpperCase()}</Button>
          <Button type="link" danger onClick={() => dispatch(deleteUsers([record.key]))}>
            {t("form.delete").toUpperCase()}
          </Button>
        </div>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => {
      setSelectedRowKeys(keys.map(String));
    },
  };
  useEffect(() => {
    dispatch(loadFromLocalStorage());
  }, [dispatch]);

  useEffect(() => {
    if (data.length === 0) {
      setDataUpdate(null);
    }
  }, [data]);

  return (
    <div className={styles.tablePageContainer}>
      <div className={styles.tableActionsContainer}>
        <input
          type="checkbox"
          checked={selectedRowKeys.length === data.length}
          onChange={(e) =>
            setSelectedRowKeys(
              e.target.checked ? data.map((d) => d.key) : []
            )
          }
        />
        <span>{t("form.SelectAll")}</span>
        <Button size="small" className={styles.btnDeleteAll} onClick={() => dispatch(deleteUsers(selectedRowKeys))}>
          {t("form.delete").toUpperCase()}
        </Button>
      </div>

      <div className={styles.tableContainer}>
        <Table<IUserData>
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          pagination={{
            placement: ["topEnd"],
            showSizeChanger: false,
            itemRender: (page, type, element) => {
              if (type === "prev")
                return (
                  <Button size="small" type="default">
                    {t("form.prev")}
                  </Button>
                );
              if (type === "next")
                return (
                  <Button size="small" type="default">
                    {t("form.next")}
                  </Button>
                );
              return element;
            },
          }}
          rowClassName={(record) =>
            selectedRowKeys.includes(record.key) ? "bg-blue-100" : ""
          }
        />
      </div>
    </div>
  );
}
