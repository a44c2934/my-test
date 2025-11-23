"use client";

import {
  Form,
  Input,
  Select,
  DatePicker,
  Radio,
  Button,
  Row,
  Col,
  message,
} from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addUser, updateUser } from "../../store/usersSlice";
import dayjs from "dayjs";
import { useRef } from "react";
import type { InputRef } from "antd";
import { useTranslations } from "next-intl";

const { Option } = Select;


const countries = [
  {
    label: "Thailand",
    value: "TH",
    dialCode: "+66",
    flag: "https://flagcdn.com/w20/th.png",
  },
  {
    label: "United States",
    value: "US",
    dialCode: "+1",
    flag: "https://flagcdn.com/w20/us.png",
  },
  {
    label: "Japan",
    value: "JP",
    dialCode: "+81",
    flag: "https://flagcdn.com/w20/jp.png",
  },
];
interface IMainFormProps {
  dataUpdate?: IUserData | null;
  setDataUpdate: React.Dispatch<React.SetStateAction<IUserData | null>>;
}

export default function MainForm({ dataUpdate, setDataUpdate }: IMainFormProps) {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();

  const t = useTranslations();

  if (dataUpdate) {
    form.setFieldsValue({
      title: dataUpdate.title,
      firstname: dataUpdate.firstname,
      lastname: dataUpdate.lastname,
      birthday: dayjs(dataUpdate.birthday),
      nationality: dataUpdate.nationality,
      citizen_1: dataUpdate.citizenId?.slice(0, 1),
      citizen_2: dataUpdate.citizenId?.slice(1, 5),
      citizen_3: dataUpdate.citizenId?.slice(5, 10),
      citizen_4: dataUpdate.citizenId?.slice(10, 12),
      gender: dataUpdate.gender,
      mobile_prefix: dataUpdate.mobile_prefix,
      mobile_number: dataUpdate.phone,
      passport: dataUpdate.passport,
      expectedSalary: dataUpdate.expectedSalary,
    });
  }

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const citizenID =
          values.citizen_1 + values.citizen_2 + values.citizen_3 + values.citizen_4;
        const payload = {
          key: dataUpdate?.key || "",
          title: values.title,
          firstname: values.firstname,
          lastname: values.lastname,
          birthday: values.birthday.format("YYYY-MM-DD"),
          nationality: values.nationality,
          citizenId: citizenID,
          gender: values.gender,
          mobile_prefix: values.mobile_prefix,
          phone: values.mobile_number,
          passport: values.passport || "",
          expectedSalary: values.expectedSalary,
        };
        if (dataUpdate) {
          dispatch(updateUser(payload));
          message.success("Updated successfully!");
        } else {
          dispatch(addUser(payload));
          message.success("Added new user!");
        }

        form.resetFields();
        setDataUpdate(null);
      })
      .catch(() => {
        message.error("Please fill all required fields");
      });
  };

  const handleReset = () => {
    form.resetFields();
    setDataUpdate(null);
  };

  return (
    <div
      style={{
        padding: 40,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1100,
          border: "2px solid rgba(0,0,0,0.4)",
          borderRadius: 12,
          padding: 16,
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Form form={form}>
          <Row gutter={16}>
            <Col span={4}>
              <Form.Item
                label={t("form.title")}
                name="title"
                rules={[{ required: true, message: "Required" }]}
              >
                <Select placeholder={t("form.title")}>
                  <Option value="Mr.">{t("form.mr")}</Option>
                  <Option value="Mrs.">{t("form.miss")}</Option>
                  <Option value="Ms.">{t("form.mrs")}</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={9}>
              <Form.Item
                label={t("form.firstname")}
                name="firstname"
                rules={[{ required: true, message: "Required" }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={9}>
              <Form.Item
                label={t("form.lastname")}
                name="lastname"
                rules={[{ required: true, message: "Required" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label={t("form.birthday")}
                name="birthday"
                rules={[{ required: true, message: "Required" }]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder={t("form.placeholderDate")}
                  format="MM/DD/YYYY"
                />
              </Form.Item>
            </Col>

            <Col span={9}>
              <Form.Item
                label={t("form.nationality")}
                name="nationality"
                rules={[{ required: true, message: "Required" }]}
              >
                <Select placeholder={t("form.pleaseSelect")}>
                  <Option value="Thai">Thai</Option>
                  <Option value="French">French</Option>
                  <Option value="American">American</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <CitizenID />

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label={t("form.gender")}
                name="gender"
                rules={[{ required: true, message: "Required" }]}
              >
                <Radio.Group>
                  <Radio value="male">{t("form.male")}</Radio>
                  <Radio value="female">{t("form.female")}</Radio>
                  <Radio value="unsex">{t("form.unsex")}</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label={t("form.mobilePhone")}
                name="mobile_prefix"
                rules={[{ required: true, message: "Required" }]}
              >
                <Select

                  options={countries.map((c) => ({
                    label: (
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <img
                          src={c.flag}
                          alt={c.label}
                          style={{
                            width: 20,
                            height: 14,
                            objectFit: "cover",
                            borderRadius: 2,
                          }}
                        />
                        <span>
                          ({c.dialCode})
                        </span>
                      </div>
                    ),
                    value: c.value,
                  }))}
                />
              </Form.Item>
            </Col>

            <Col span={9}>
              <Form.Item
                label="-"
                colon={false}
                name="mobile_number"
                rules={[{ required: true, message: "Required" }]}
              >
                <Input maxLength={10} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={10}>
              <Form.Item
                label={t("form.passport")}
                name="passport">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={10}>
              <Form.Item
                label={t("form.expectedSalary")}
                name="expectedSalary"
                rules={[{ required: true, message: "Required" }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col
              span={14}
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "space-evenly",
                gap: 8,
              }}
            >
              <Button onClick={handleReset}>{t("form.reset").toUpperCase()}</Button>

              <Button onClick={handleSubmit}>
                {/* {dataUpdate ? "UPDATE" : "SUBMIT"} */}
                {t("form.submit").toUpperCase()}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export function CitizenID() {
  const c1 = useRef<InputRef>(null);
  const c2 = useRef<InputRef>(null);
  const c3 = useRef<InputRef>(null);
  const c4 = useRef<InputRef>(null);
  const t = useTranslations();
  const handleAutoFocus = (
    e: React.ChangeEvent<HTMLInputElement>,
    max: number,
    next?: React.RefObject<InputRef>,
    prev?: React.RefObject<InputRef>
  ) => {
    const value = e.target.value;

    if (value.length === max && next?.current) {
      next.current.focus();
    }

    if (value.length === 0 && prev?.current) {
      prev.current.focus();
    }
  };

  return (
    <Row gutter={16}>
      <Col span={4}>
        <Form.Item
          label={t("form.citizenID")}
          name="citizen_1">
          <Input
            maxLength={1}
            ref={c1}
            onChange={(e) => handleAutoFocus(e, 1, c2)}
            style={{ textAlign: "center" }}
          />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item label="-" colon={false} name="citizen_2">
          <Input
            maxLength={4}
            ref={c2}
            onChange={(e) => handleAutoFocus(e, 4, c3, c1)}
            style={{ textAlign: "center" }}
          />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item label="-" colon={false} name="citizen_3">
          <Input
            maxLength={5}
            ref={c3}
            onChange={(e) => handleAutoFocus(e, 5, c4, c2)}
            style={{ textAlign: "center" }}
          />
        </Form.Item>
      </Col>

      <Col span={4}>
        <Form.Item label="-" colon={false} name="citizen_4">
          <Input
            maxLength={2}
            ref={c4}
            onChange={(e) => handleAutoFocus(e, 2, undefined, c3)}
            style={{ textAlign: "center" }}
          />
        </Form.Item>
      </Col>
    </Row>
  );
}
